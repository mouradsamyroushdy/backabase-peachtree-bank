//#region --------------------------------------- ANGULAR
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//#endregion ------------------------------------

//#region --------------------------------------- 3RD-PARTIES
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
//#endregion ------------------------------------

//#region --------------------------------------- APPLICATION
import { NewTransfer, TransactionDetails, TransactionTypes } from '../models';
import * as TRANSACTIONS_JSON from '../bb-ui/mock-data/transactions.json';
import * as URL from '../constants/urls.constants';
//#endregion ------------------------------------

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  //#region ------------------------------------- VARIABLES
  transactions$ = new BehaviorSubject<Array<TransactionDetails>>([]);
  //#endregion ----------------------------------

  //#region ------------------------------------- LIFECYCLE
  constructor(private http: HttpClient) {
    this.getTransactions().subscribe(this.transactions$);
  }
  //#endregion ----------------------------------

  //#region ------------------------------------- PUBLIC-METHODS
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
  //#endregion ----------------------------------

  //#region ------------------------------------- PRIVATE-METHODS
  private getTransactions(): Observable<Array<TransactionDetails>> {
    return this.http.get<Array<TransactionDetails>>(URL.TRANSACTIONS).pipe(
      catchError((_) => this.getJSONTransactions()),
      tap(this.adjustTransfers)
    );
  }

  private getJSONTransactions(): Observable<Array<TransactionDetails>> {
    return of(TRANSACTIONS_JSON?.data as Array<TransactionDetails>);
  }

  private adjustTransfers(transactions: Array<TransactionDetails>): void {
    transactions.sort((a, b) => {
      const dateA = new Date(a.dates?.valueDate);
      const dateB = new Date(b.dates?.valueDate);
      return dateA == dateB ? 0 : dateA > dateB ? -1 : 1;
    });
  }
  //#endregion ----------------------------------
}
