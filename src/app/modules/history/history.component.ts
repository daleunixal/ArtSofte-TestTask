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
    {field: 'senderCard', headerName: 'С карты', flex: "1"},
    {field: 'recipientCard', headerName: 'На карту', flex: "2"},
    {field: 'recipientCard', headerName: 'Сумма', flex: "3"},
    {field: 'date', headerName: 'Дата', flex: "4"},
    {field: 'senderName', headerName: 'Имя держателя', flex: "5"},
    {field: 'hash', hide: true},
    {headerName: 'Удалить?',cellRenderer: 'buttonRenderer', cellRendererParams:{
        onClick: this.onRowPublishBtnClick.bind(this),
        label: 'Delete',
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

  onRowPublishBtnClick(e) {
    console.log(e.rowData);
  }

  public onGridReady(params){
    this.gridApi = params.gridApi;
  }
}
