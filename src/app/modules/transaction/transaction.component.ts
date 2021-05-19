import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HistoryProviderService} from '../../services/history-provider.service';
import {History} from '../../models/history';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css', '../../app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionComponent implements OnInit {

  cashForm: FormGroup;
  senderForm: FormGroup;
  recipientForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _historyProvider: HistoryProviderService) { }

  ngOnInit(): void {
    console.log(this._formBuilder)
    debugger
    this.cashForm = this._formBuilder.group({
      value: [null,[
        Validators.pattern('^[0-9]*(.[0-9]{1,2})?$'),
        Validators.minLength(2),
        Validators.required]]
    })
    this.senderForm = this._formBuilder.group({
      cardNumber: [null, [Validators.pattern('^[0-9]{16}$'), Validators.required]],
      senderName: [null, [Validators.pattern('^[A-Za-z ,.\'-]+$'), Validators.required]]
    })

    this.recipientForm = this._formBuilder.group({
      cardNumber: [null, [Validators.pattern('^[0-9]{16}$'), Validators.required]]
    })
  }

  onSubmit() {
    if(this.senderForm.valid && this.cashForm.valid && this.recipientForm.valid) {
      this._historyProvider.saveTransaction(new History({
        expireMonth: 0,
        expireYear: 0,
        recipientCard: this.recipientForm.value.cardNumber,
        senderCard: this.senderForm.value.cardNumber,
        senderName: this.senderForm.value.senderName,
        value: this.cashForm.value.value
      }));
      return;
    }
    alert("Некорректные данные");
  }
}
