import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  authed = false;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.checkAuth();
    console.log("ONINIT" + this.authed)
    // this.http.get('/authenticate').subscribe(data => {
    //   var authStatus = (data as any);
    //   this.isAuthed = authStatus.authenticated;
    // });
  }

  logout(){
    this.authed = false;
    this.http.get('/login/fake/user').subscribe(data => {
      // var authStatus = (data as any);
      // this.isAuthed = authStatus.authenticated;
    });
    window.location.reload();
  }

  checkAuth(){
    this.http.get('/authenticate').subscribe(data => {
      var authStatus = (data as any);
      this.authed = authStatus.authenticated;
      console.log("CHECKAUTH "  + this.authed);
      console.log(authStatus.authenticated);
    });

  }
}
