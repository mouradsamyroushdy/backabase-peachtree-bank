export class TransactionDetails {
  id?: string;
  merchant?: Merchant;
  dates?: TransactionDates;
  categoryCode?: string;
  transaction?: Transaction;
}
export class Transaction {
  type?: TransactionTypes;
  creditDebitIndicator?: CreditDebitIndicator;
  amountCurrency?: AmountCurrency;
}
export class Merchant {
  name?: string;
  accountNumber?: string;
}

export class TransactionDates {
  valueDate?: any;
}

export enum TransactionTypes {
  CardPayment = 'Card Payment',
  Transaction = 'Transaction',
  OnlineTransfer = 'Online Transfer',
  Salaries = 'Salaries',
}
export type CreditDebitIndicator = 'DBIT' | 'CRDT';
export type CurrencyCodes = 'EUR' | 'USD';
export class AmountCurrency {
  amount?: string | number;
  currencyCode?: CurrencyCodes;
}
