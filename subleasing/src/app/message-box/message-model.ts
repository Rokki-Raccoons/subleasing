export class MessageModel {
  constructor(
    public senderName: string,
    public senderID: string,
    public messageBody: string,
    public messageID: number){}
}
