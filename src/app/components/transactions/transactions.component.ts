import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TransactionsService } from 'src/app/services';
import { TransactionDetails } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TransactionsComponent {
  filter: string;
  @Input() transactions: Array<TransactionDetails>;
}
