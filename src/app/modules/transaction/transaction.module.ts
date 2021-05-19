import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TransactionComponent} from './transaction.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {path: '', component: TransactionComponent}
];


@NgModule({
  declarations: [
    TransactionComponent
  ],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      ReactiveFormsModule
    ]
})
export class TransactionModule { }
