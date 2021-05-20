import * as hashFunc from 'hash-it';

export interface IHistory{
  senderCard: number
  senderName: string
  expireMonth: number
  expireYear: number
  recipientCard: number
  value: number
  hash?: number
  date?: Date;
}

export class History implements IHistory{
  expireMonth: number;
  expireYear: number;
  recipientCard: number;
  senderCard: number;
  senderName: string;
  value: number;
  hash?: number;
  date?: Date;

  constructor(params: IHistory) {
    this.date = new Date();
    this.expireMonth = params.expireMonth;
    this.expireYear = params.expireYear;
    this.value = params.recipientCard;
    this.recipientCard = params.recipientCard;
    this.senderCard = params.senderCard;
    this.senderName = params.senderName;
    this.hash = this.getHash();
  }

  private getHash(){
    return hashFunc.default(this);
  }
}
