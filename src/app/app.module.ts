import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BbUIModule } from './bb-ui/bb-ui.module';
import { MakeTransferComponent } from './components/make-transfer/make-transfer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReviewTransferDialogComponent } from './components/review-transfer-dialog/review-transfer-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { HttpClientModule } from '@angular/common/http';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { FilterPipe } from './filters';

@NgModule({
  declarations: [
    AppComponent,
    MakeTransferComponent,
    ReviewTransferDialogComponent,
    ErrorDialogComponent,
    DialogComponent,
    TransactionsComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BbUIModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    HttpClientModule,
    OverlayscrollbarsModule,
  ],
  providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } }],
  bootstrap: [AppComponent],
})
export class AppModule {}
