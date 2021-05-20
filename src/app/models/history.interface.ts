export interface IHistory {
    senderCard: number
    senderName: string
    expireMonth: number
    expireYear: number
    recipientCard: number
    value: number
    hash?: number
    date?: Date;
}
