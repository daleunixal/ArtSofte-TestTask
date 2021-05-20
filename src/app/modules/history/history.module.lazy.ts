import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoryComponent} from './history.component';
import {RouterModule, Routes} from '@angular/router';
import {AgGridModule} from 'ag-grid-angular';
import {ButtonRendererComponent} from './button-renderer.component';


const routes: Routes = [
    {path: '', component: HistoryComponent}
];

@NgModule({
    declarations: [
        HistoryComponent,
        ButtonRendererComponent
    ],
    imports: [
        CommonModule,
        AgGridModule.withComponents([ButtonRendererComponent]),
        RouterModule.forChild(routes)
    ]
})
export class HistoryModule {
}
