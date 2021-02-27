import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { decimalValidator } from 'src/app/validators';
import { ReviewTransferDialogComponent } from '../review-transfer-dialog/review-transfer-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { TransactionsService } from 'src/app/services';
import { NewTransfer } from '../../models/new-transfer.model';

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.scss'],
})
export class MakeTransferComponent implements OnInit {
  //#region ------------------------------------- Variables
  readonly amount: number = 5824.76;
  form: FormGroup = this.getForm();
  currentProfile?: Object;
  loading: boolean = true;
  fromAccount?: string;
  //#endregion ----------------------------------

  //#region ------------------------------------- Children
  @ViewChild('invalidTransactionFormRef') invalidTransactionFormRef: TemplateRef<any>;
  @ViewChild('successfulTransactionRef') successfulTransactionRef: TemplateRef<any>;
  @ViewChild('toAccountRef') toAccountRef: ElementRef<any>;
  //#endregion ----------------------------------

  //#region ------------------------------------- Lifecycle
  constructor(
    private transactionsService: TransactionsService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }
  //#endregion ----------------------------------

  //#region ------------------------------------- Public-Methods
  /**
   * Validate make-transfer form, then confirm actions.
   */
  submitForm(): void {
    if (!this.form.dirty) this.form.markAsDirty();

    if (this.form.valid) {
      this.openReviewTransferDialog();
    } else {
      this.snackbar.openFromTemplate(this.invalidTransactionFormRef);
    }
  }
  //#endregion ----------------------------------

  //#region ------------------------------------- Private-Methods
  private getForm(): FormGroup {
    return new FormGroup({
      fromAccount: new FormControl(null),
      toAccount: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [
        Validators.required,
        Validators.max(this.amount),
        decimalValidator(),
      ]),
    });
  }

  private loadProfile(): void {
    this.fromAccount = `My Personal Account: € ${this.amount}`;
    this.loading = false;
  }

  /**
   * Opens a dialog to review transaction details before submitting.
   *
   * @action `approve`: submit transaction and clear form.
   * @action `cancel`: no action required.
   */
  private openReviewTransferDialog(): void {
    const dialogRef = this.dialog.open(ReviewTransferDialogComponent, {
      width: '500px',
      data: { amount: this.form.get('amount')?.value, account: this.form.get('toAccount')?.value },
    });

    dialogRef.afterClosed().subscribe((response) => {
      this.toAccountRef.nativeElement.focus();
      if (response) {
        this.sendTransfer().subscribe({
          next: () => {
            this.form.reset();
            this.snackbar.openFromTemplate(this.successfulTransactionRef);
          },
        });
      }
    });
  }

  /**
   * Submit transfer to backend API when exists.
   */
  private sendTransfer(): Observable<boolean> {
    const transfer: NewTransfer = {
      toAccount: this.form.get('toAccount')?.value,
      amount: this.form.get('amount')?.value,
      fromAccount: this.fromAccount,
      currencyCode: 'EUR',
    };

    return this.transactionsService.addTransfer(transfer);
  }
  //#endregion ----------------------------------
}
