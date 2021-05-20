import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';


@Component({
    selector: 'app-button-renderer',
    template: `
        <button type="button" (click)="onClick($event)">{{_label}}</button>
    `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

    public _label: string;
    private _params;

    agInit(params): void {
        this._params = params;
        this._label = this._params.label || null;
    }

    refresh(params?: any): boolean {
        return true;
    }

    onClick($event): void {
        if (this._params.onClick instanceof Function) {
            this._params.onClick(this._params.node.data.hash);
        }
    }
}
