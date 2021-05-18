import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HistoryComponent} from './history.component';
import {RouterModule, Routes} from '@angular/router';
import {CustomsComponent} from '../../customs/customs.component';

const routes: Routes = [
  { path: '', component: HistoryComponent }
];

@NgModule({
  declarations: [
    HistoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HistoryModule { }