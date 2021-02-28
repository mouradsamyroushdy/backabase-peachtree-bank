import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TransactionDetails } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TransactionsComponent {
  filter: string | undefined;
  @Input() transactions: Array<TransactionDetails> = [];
}
