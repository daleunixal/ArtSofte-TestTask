import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HistoryProviderService} from '../../services/history-provider.service';
import {IHistory} from '../../models/history';
import {ButtonRendererComponent} from './button-renderer.component';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryComponent implements OnInit {
  private gridApi;
  historyStash: Array<IHistory>

  columnDef = [
    {field: 'senderCard', headerName: 'С карты'},
    {field: 'recipientCard', headerName: 'На карту'},
    {field: 'recipientCard', headerName: 'Сумма'},
    {field: 'date', headerName: 'Дата'},
    {field: 'senderName', headerName: 'Имя держателя'},
    {field: 'hash', hide: true},
    {headerName: 'Удалить?',cellRenderer: 'buttonRenderer', cellRendererParams:{
        onClick: this.onDeleteBtnClick.bind(this),
        label: 'Delete',
      }},
    {headerName: 'Повторить?',cellRenderer: 'buttonRenderer', cellRendererParams:{
        onClick: this.onRepeatBtnClick.bind(this),
        label: 'Повторить',
      }}
  ]
  frameworkComponents;

  constructor(private _historyProvider: HistoryProviderService) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent
    }
  }

  ngOnInit(): void {
    this.historyStash = this._historyProvider.getTransactions();
  }

  onRepeatBtnClick(e) {
    console.log(e);
    this._historyProvider.repeatTransaction(e);
  }

  onDeleteBtnClick(e){
    this._historyProvider.removeTransaction(e);
    this.historyStash = this._historyProvider.getTransactions();
  }

  public onGridReady(params){
    this.gridApi = params.gridApi;
  }
}
