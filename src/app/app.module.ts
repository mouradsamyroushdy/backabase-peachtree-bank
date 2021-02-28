//#region --------------------------------------- Angular
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
//#endregion ------------------------------------

//#region --------------------------------------- 3rd-Parties
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { BbUIModule } from './bb-ui/bb-ui.module';
import { MaterialModule } from './material.module';
//#endregion ------------------------------------

//#region --------------------------------------- App
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as COMPONENTS from './components';
import * as PIPES from './pipes';
//#endregion ------------------------------------

@NgModule({
  declarations: [
    AppComponent,
    COMPONENTS.DialogComponent,
    COMPONENTS.MakeTransferComponent,
    COMPONENTS.ReviewTransferDialogComponent,
    COMPONENTS.TransactionsComponent,
    PIPES.FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BbUIModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OverlayscrollbarsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
