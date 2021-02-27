import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TransactionDetails } from '../models';
import * as transactionsJSON from '../bb-ui/mock-data/transactions.json';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  constructor(private http: HttpClient) {}

  getTransactions(): Observable<Array<TransactionDetails>> {
    const url = 'https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions';
    return this.http.get<Array<TransactionDetails>>(url).pipe(
      catchError((_) => this.getJSONTransactions()),
      tap((results) => {
        results.sort((a, b) => {
          const dateA = new Date(a.dates?.valueDate);
          const dateB = new Date(b.dates?.valueDate);
          return dateA == dateB ? 0 : dateA > dateB ? -1 : 1;
        });
      })
    );
  }

  getJSONTransactions(): Observable<Array<TransactionDetails>> {
    return of(transactionsJSON?.data as Array<TransactionDetails>);
  }
}
