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
  usern = "Profile";

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
    console.log("logout hit");
    this.authed = false;
    this.usern = "Profile";
    this.http.get('/login/fakename/userthatdoesnotexist').subscribe(data => {});
  }

  checkAuth(){
    this.http.get('/authenticate').subscribe(data => {
      var authStatus = (data as any);
      this.authed = authStatus.authenticated;
      this.usern = authStatus.usersname;
      console.log("CHECKAUTH "  + this.authed + this.usern);
      console.log(authStatus.authenticated);
    });

  }
}
