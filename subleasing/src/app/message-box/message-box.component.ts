import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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

  constructor(private route: ActivatedRoute) {
    this.message = {senderName: "-",
                    senderID: 0,
                    messageBody: "-",
                    messageID: 0};
  }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params=>{
    // this.senderName = params.senderName;
    // this.senderID = params.senderID;
    // this.messageBody = params.messageBody;
    // this.messageID = params.messageID;
    this.senderName = this.message.senderName;
    this.senderID = this.message.senderID;
    this.messageBody = this.message.messageBody;
    this.messageID = this.message.messageID;
  }

}
