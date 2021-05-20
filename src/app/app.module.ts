import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {TransactionModule} from './modules/transaction/transaction.module.lazy';
import {SharedModule} from './modules/shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        TransactionModule,
        SharedModule,
        RouterModule.forRoot([
            {path: '', loadChildren: () => import('./modules/transaction/transaction.module.lazy').then(m => m.TransactionModule)},
            {path: 'history', loadChildren: () => import('./modules/history/history.module.lazy').then(m => m.HistoryModule)},
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
