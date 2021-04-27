import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
    
  // API url
  baseApiUrl = "http://localhost:3000/fileUpload";
    
  constructor(private http:HttpClient) { }
  
  // Returns an observable
  upload(file:any):Observable<any> {
  
      // Create form data
      const formData = new FormData(); 
        
      // Store form name as "file" with file data
      formData.append("file", file, file.name);
        
      // Make http post request over api
      // with formData as req
      return this.http.post(this.baseApiUrl, formData);
  }

  sendImageToServer = function(data:any){
    console.log( 'Sending data:' );
    console.log(data);
    console.log("extracted file:");
    console.log(data[0]);

      const XHR = new XMLHttpRequest();

      let urlEncodedData = "",
          urlEncodedDataPairs = [],
          name;

      // Turn the data object into an array of URL-encoded key/value pairs.
      for( name in data ) {
        urlEncodedDataPairs.push( encodeURIComponent( name ) + '=' + encodeURIComponent( data[name] ) );
      }

      // Combine the pairs into a single string and replace all %-encoded spaces to
      // the '+' character; matches the behavior of browser form submissions.
      urlEncodedData = urlEncodedDataPairs.join( '&' ).replace( /%20/g, '+' );

      // Define what happens on successful data submission
      XHR.addEventListener( 'load', function(event) {
        alert( 'Yeah! Data sent and response loaded.' );
      } );

      // Define what happens in case of error
      XHR.addEventListener( 'error', function(event) {
        alert( 'Oops! Something went wrong.' );
      } );

      // Set up our request
      XHR.open( 'POST', 'http://localhost:3000/fileUpload');

      // Add the required HTTP header for form data POST requests
      //XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
      XHR.setRequestHeader( 'Content-Type', 'multipart/form-data' );

      // Finally, send our data.
      XHR.send( urlEncodedData );



      // console.log("file data:");
      // console.log(file);

      // // Create form data
      // const formData = new FormData(); 
        
      // // Store form name as "file" with file data
      // // formData.append("file", file, file.name);
      // formData.append("file", file);

      // formData.append("dummy", "simplecontent");

      // console.log("form data:");
      // console.log(formData);
        
      // // Make http post request over api
      // // with formData as req

      // var httpPost = new XMLHttpRequest(),
      //     path = "http://localhost:3000/fileUpload/" + file.name,
      //     data = JSON.stringify({image: file});
      // httpPost.onreadystatechange = function(err) {
      //         if (httpPost.readyState == 4 && httpPost.status == 200){
      //             console.log(httpPost.responseText);
      //         } else {
      //             console.log(err);
      //         }
      //     };
      // // Set the content type of the request to json since that's what's being sent
      // httpPost.open("POST", path, true);
      // // httpPost.setRequestHeader('Content-Type', 'multipart/form-data');
      // httpPost.send(formData);
  };
}