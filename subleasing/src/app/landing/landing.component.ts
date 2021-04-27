import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private http: HttpClient) { }

  un = new FormControl('');
  pw = new FormControl('');

  loginAttempt(){
    console.log('http://localhost:3000/login/' + this.un.value + "/" + this.pw.value);
    this.http.get('http://localhost:3000/login/' + this.un.value + "/" + this.pw.value).subscribe(data => {
      var statusInfo = (data as any);
      if(statusInfo.statusCode == 200){
        (<HTMLInputElement>document.getElementById("succeeded")).style.display = "block";
        (<HTMLInputElement>document.getElementById("invalid")).style.display = "none";
        (<HTMLInputElement>document.getElementById("invalid2")).style.display = "none";
        (<HTMLInputElement>document.getElementById("newuser")).style.display = "none";
        window.location.href = "/listings";
      }else{
        (<HTMLInputElement>document.getElementById("invalid")).style.display = "block";
        (<HTMLInputElement>document.getElementById("succeeded")).style.display = "none";
        (<HTMLInputElement>document.getElementById("invalid2")).style.display = "none";
        (<HTMLInputElement>document.getElementById("newuser")).style.display = "none";
      }
    })
    return true;
  }

  registerAttempt(){
    // console.log('http://localhost:3000/register/' + this.un.value + "/" + this.pw.value);
    this.http.get('http://localhost:3000/register/' + this.un.value + "/" + this.pw.value).subscribe(data => {
      var statusInfo = (data as any);
      if(statusInfo.statusCode == 201){
        (<HTMLInputElement>document.getElementById("newuser")).style.display = "block";
        (<HTMLInputElement>document.getElementById("invalid2")).style.display = "none";
        (<HTMLInputElement>document.getElementById("succeeded")).style.display = "none";
        (<HTMLInputElement>document.getElementById("invalid")).style.display = "none";
        window.location.href = "/listings";
      }
      if(statusInfo.statusCode == 422){
        (<HTMLInputElement>document.getElementById("invalid2")).style.display = "block";
        (<HTMLInputElement>document.getElementById("newuser")).style.display = "none";
        (<HTMLInputElement>document.getElementById("succeeded")).style.display = "none";
        (<HTMLInputElement>document.getElementById("invalid")).style.display = "none";
      }
    })
    return true;
  }

  ngOnInit(): void {
  }

}
