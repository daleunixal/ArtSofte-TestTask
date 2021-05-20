import { Injectable } from '@angular/core';
import {IHistory} from '../models/history';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HistoryProviderService {

  private _history: Array<IHistory> = [];

  constructor(private _router: Router) {

  }

  private parseStorage(){
    for(let key of Object.keys(localStorage)){
      let item: IHistory = JSON.parse(localStorage.getItem(key));
      this._history.push(item);
    }
    this._history.sort((a,b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
  }

  public saveTransaction(item: IHistory){
    console.log(item)
    localStorage.setItem(item.hash.toString(), JSON.stringify(item))
    console.log("Holy shiiiiit")
  }

  public getTransactions(){
    if(this._history.length === 0)
      this.parseStorage();
    return this._history;
  }

  public getTransaction(hash: number): IHistory{
    return JSON.parse(localStorage.getItem(hash.toString()))
  }

  public repeatTransaction(hash: number){
    this._router.navigate(['/'], {queryParams: {hash: hash}})
  }

  public removeTransaction(hash: number){
    debugger;
    localStorage.removeItem(hash.toString())
    this._history = [];
  }
}
