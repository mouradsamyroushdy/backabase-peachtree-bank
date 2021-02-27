import { CurrencyCodes } from './transaction.model';

export class NewTransfer {
  amount?: number;
  currencyCode?: CurrencyCodes;
  toAccount?: string;
  fromAccount?: string;
}
