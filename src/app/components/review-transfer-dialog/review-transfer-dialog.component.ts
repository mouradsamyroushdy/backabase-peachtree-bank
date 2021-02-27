import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-review-transfer-dialog',
  templateUrl: './review-transfer-dialog.component.html',
  styleUrls: ['./review-transfer-dialog.component.scss'],
})
export class ReviewTransferDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ReviewTransferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { amount: number; account: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
