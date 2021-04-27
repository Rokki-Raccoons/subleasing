import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-datavis',
  templateUrl: './datavis.component.html',
  styleUrls: ['./datavis.component.css']
})
export class DatavisComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  public getStructuresCSV (){
    const body = JSON.stringify({});
    var url = "http://localhost:3000/structures";
    const headers = {};
    const options = {'headers':headers, 'params':{}}
    console.log("Grabbing Structure Data: "+body);

    this.http.get(url, options).subscribe((data) => {
      console.log(data);

      url = "http://localhost:3000/structstyleCSV";
      window.location.href = url;
    });

  }

  public getYearPriceCSV (){
    const body = JSON.stringify({});
    var url = "http://localhost:3000/yearPrice";
    const headers = {};
    const options = {'headers':headers, 'params':{}}
    console.log("Grabbing yearPrice Data: "+body);

    this.http.get(url, options).subscribe((data) => {
      console.log(data);

      url = "http://localhost:3000/yearPriceCSV";
      window.location.href = url;
    });

  }

}
