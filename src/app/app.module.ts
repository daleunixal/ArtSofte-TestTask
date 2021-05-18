import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {TransactionModule} from './modules/transaction/transaction.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TransactionModule,
    RouterModule.forRoot([
      { path: '', loadChildren: () => import('./modules/transaction/transaction.module').then(m => m.TransactionModule) },
      { path: 'history', loadChildren: () => import('./modules/history/history.module').then(m => m.HistoryModule) },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
