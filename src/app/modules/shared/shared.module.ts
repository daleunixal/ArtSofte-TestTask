import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedComponent} from './shared.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    SharedComponent
  ],
  exports: [
    SharedComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
    ]
})
export class SharedModule { }
