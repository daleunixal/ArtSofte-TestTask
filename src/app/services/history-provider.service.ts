import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {IHistory} from '../models/history.interface';


@Injectable({
    providedIn: 'root'
})
export class HistoryProviderService {

    private _history: Array<IHistory> = [];

    constructor(private _router: Router) {
    }

    public saveTransaction(item: IHistory): void {
        console.log(item);
        localStorage.setItem(item.hash.toString(), JSON.stringify(item));
        this._history = [];
    }

    public getTransactions(): Array<IHistory> {
        if (this._history.length === 0) {
            this.parseStorage();
        }

        return this._history;
    }

    public getTransaction(hash: number): IHistory {
        return JSON.parse(localStorage.getItem(hash.toString()));
    }

    public repeatTransaction(hash: number): void {
        this._router.navigate(['/'], {queryParams: {hash: hash}});
    }

    public removeTransaction(hash: number): void {
        debugger;
        localStorage.removeItem(hash.toString());
        this._history = [];
    }

    private parseStorage(): void {
        for (let key of Object.keys(localStorage)) {
            let item: IHistory = JSON.parse(localStorage.getItem(key));
            this._history.push(item);
        }
        this._history.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    }
}
