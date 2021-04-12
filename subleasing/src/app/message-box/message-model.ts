export class MessageModel {
  constructor(
    public senderName: string,
    public senderID: number,
    public messageBody: string,
    public messageID: number){}
}
