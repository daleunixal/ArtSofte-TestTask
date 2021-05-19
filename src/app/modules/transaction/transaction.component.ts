import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css', '../../app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionComponent implements OnInit {

  cashForm;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
