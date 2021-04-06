import { Component, OnInit, Input } from '@angular/core';

import {MessageModel} from './message-model'

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {

  @Input() public message : MessageModel;

  senderName = "None";
  senderID = -1;
  messageBody = "-";
  messageID = -1;

  constructor() { 
    this.message = {senderName: "-",
                    senderID: 0,
                    messageBody: "-",
                    messageID: 0};
  }

  ngOnInit(): void {
    this.senderName = this.message.senderName;
    this.senderID = this.message.senderID;
    this.messageBody = this.message.messageBody;
    this.messageID = this.message.messageID;
  }

}
