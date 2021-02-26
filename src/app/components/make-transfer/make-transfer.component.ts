import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { decimalValidator } from 'src/app/validators';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { ReviewTransferDialogComponent } from '../review-transfer-dialog/review-transfer-dialog.component';

@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.scss']
})
export class MakeTransferComponent implements OnInit {
  readonly amount:number=5824.76;
  form:FormGroup;
  currentProfile:Object;
  loading:boolean;
  fromAccount:string;

  constructor(public dialog: MatDialog) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.loadProfile();
  }
  submitForm():void{
    if(!this.form.touched) this.form.markAsTouched();

    if (this.form.valid) {
      this.openReviewTransferDialog();
    } else {
      this.openErrorDialog();
    }
  }
  private buildForm():void{
    this.form = new FormGroup({
      fromAccount:new FormControl(null),
      toAccount:new FormControl(null,[Validators.required]),
      amount:new FormControl(null,[Validators.required,Validators.max(this.amount),decimalValidator()])
    });
  }

  private loadProfile():void{
    this.fromAccount=`My Personal Account: € ${this.amount}`;
    this.loading=false;
  }

  private openErrorDialog():void{
    this.dialog.open(ErrorDialogComponent, {
      width: '500px',
      data:"Can not submit transfer with invalid parameters, check form errors."
    });
  }

  private openReviewTransferDialog():void{
    const dialogRef = this.dialog.open(ReviewTransferDialogComponent, {
      width: '500px',
      data: {amount: this.form.get('amount')?.value, account: this.form.get('toAccount')?.value}
    });

    dialogRef.afterClosed().subscribe(response=> {
      if(response){
        this.form.reset();
      }
    });
  }
}
