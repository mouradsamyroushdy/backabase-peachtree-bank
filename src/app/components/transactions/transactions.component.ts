import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionsService } from 'src/app/services';
import { TransactionDetails } from '../../models/transaction.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TransactionsComponent implements OnInit {
  transactions$: Observable<Array<TransactionDetails>>;
  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.transactions$ = this.transactionsService.getTransactions();
  }
}
