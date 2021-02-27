import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NewTransfer, TransactionDetails, TransactionTypes } from '../models';
import * as transactionsJSON from '../bb-ui/mock-data/transactions.json';
@Injectable({ providedIn: 'root' })
export class TransactionsService {
  transactions$ = new BehaviorSubject<Array<TransactionDetails>>([]);

  constructor(private http: HttpClient) {
    this.getTransactions().subscribe(this.transactions$);
  }

  private getTransactions(): Observable<Array<TransactionDetails>> {
    const url = 'https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions';
    return this.http.get<Array<TransactionDetails>>(url).pipe(
      catchError((_) => this.getJSONTransactions()),
      tap(this.adjustTransfers)
    );
  }

  private getJSONTransactions(): Observable<Array<TransactionDetails>> {
    return of(transactionsJSON?.data as Array<TransactionDetails>);
  }

  private adjustTransfers(transactions: Array<TransactionDetails>): void {
    transactions.sort((a, b) => {
      const dateA = new Date(a.dates?.valueDate);
      const dateB = new Date(b.dates?.valueDate);
      return dateA == dateB ? 0 : dateA > dateB ? -1 : 1;
    });
  }

  addTransfer(transfer: NewTransfer): Observable<boolean> {
    const transaction: TransactionDetails = {
      dates: {
        valueDate: new Date(),
      },
      merchant: {
        name: transfer.toAccount,
      },
      transaction: {
        amountCurrency: {
          amount: transfer.amount,
          currencyCode: 'EUR',
        },
        type: TransactionTypes.OnlineTransfer,
        creditDebitIndicator: 'DBIT',
      },
    };

    this.transactions$.value.unshift(transaction);
    return of(true);
  }
}
