import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HistoryProviderService} from '../../services/history-provider.service';
import {History} from '../../models/history.model';
import {ActivatedRoute} from '@angular/router';
import {IHistory} from '../../models/history.interface';

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.css', '../../app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TransactionComponent implements OnInit {

    public monthArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    public cashForm: FormGroup;
    public senderForm: FormGroup;
    public recipientForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
                private _historyProvider: HistoryProviderService,
                private _route: ActivatedRoute,) {
    }

    ngOnInit(): void {
        this.cashForm = this._formBuilder.group({
            value: [null, [
                Validators.pattern('^[0-9]*(.[0-9]{1,2})?$'),
                Validators.minLength(2),
                Validators.required]]
        });
        this.senderForm = this._formBuilder.group({
            cardNumber: [null, [Validators.pattern('^[0-9]{16}$'), Validators.required]],
            senderName: [null, [Validators.pattern('^[A-Za-z ,.\'-]+$'), Validators.required]],
            monthSelect: [null, [Validators.required]],
            yearSelect: [null, [Validators.required]]
        });

        this.recipientForm = this._formBuilder.group({
            cardNumber: [null, [Validators.pattern('^[0-9]{16}$'), Validators.required]]
        });

        this._route.queryParams.subscribe(params => {
            if (!Object.keys(params).length) {
                return;
            }
            console.log(params);
            this.setTransaction(params.hash);
        });
    }

    onSubmit(): void {
        if (this.senderForm.valid && this.cashForm.valid && this.recipientForm.valid) {
            this._historyProvider.saveTransaction(new History({
                expireMonth: this.senderForm.value.monthSelect,
                expireYear: this.senderForm.value.yearSelect,
                recipientCard: this.recipientForm.value.cardNumber,
                senderCard: this.senderForm.value.cardNumber,
                senderName: this.senderForm.value.senderName,
                value: this.cashForm.value.value
            }));
            console.log(this.senderForm.value);
            alert('Операция успешна');
            this.senderForm.reset();
            this.recipientForm.reset();
            this.cashForm.reset();

            return;
        }
        alert('Некорректные данные');
    }

    public getDecadeArray(): Array<string> {
        let tenYearArray = [];
        let nowYear = new Date().getFullYear();
        for (let i = 0; i < 10; i++) {
            tenYearArray.push((nowYear + i).toString().slice(2, 4));
        }

        return tenYearArray;
    }

    private setTransaction(hash: number): void {
        debugger
        let historyRecord: IHistory = this._historyProvider.getTransaction(hash);
        this.cashForm.setValue({
            value: historyRecord.value
        });

        this.recipientForm.setValue({
            cardNumber: historyRecord.recipientCard
        });

        this.senderForm.setValue({
            cardNumber: historyRecord.senderCard,
            senderName: historyRecord.senderName,
            yearSelect: historyRecord.expireYear.toString(),
            monthSelect: historyRecord.expireMonth.toString()
        });


    }
}
