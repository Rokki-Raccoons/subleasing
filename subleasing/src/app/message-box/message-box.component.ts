import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MessageModel} from './message-model'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {

  @Input() public message : MessageModel;

  senderName = "None";
  senderID = "608750b107f1901d008a9ff3";
  messageBody = "Hi, it's Kolby, I love the property! Let's talk! <phone number>";
  messageID = -1;
  showButton = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.message = {senderName: "-",
                    senderID: "",
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
    if(this.messageID == 6){
      this.showButton = false;
    }
  }

  contactClient(){
      this.http.get('/contactClient/' + this.senderID ).subscribe(data => {});
  }

}
