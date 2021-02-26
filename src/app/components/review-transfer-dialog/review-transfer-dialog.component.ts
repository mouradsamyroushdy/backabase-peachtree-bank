import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-review-transfer-dialog',
  templateUrl: './review-transfer-dialog.component.html',
  styleUrls: ['./review-transfer-dialog.component.scss']
})
export class ReviewTransferDialogComponent  {
    constructor(@Inject(MAT_DIALOG_DATA) public data: {amount: number,account:string}) { }
}
