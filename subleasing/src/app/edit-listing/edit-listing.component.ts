import { Component, OnInit, Input, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {ListingModel} from '../listing-card/listing-model'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FileUploadService } from '../file-upload.service';
  

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {

  @Input() public editor : ListingModel;

  URL = "http://localhost:3000/ownedListings";

  // Variable to store shortLink from api response
    shortLink: string = "";
    loading: boolean = false; // Flag variable
    file: File | null = null; // Variable to store file

    testFile: Blob = new Blob();


  constructor(private http: HttpClient, private fileUploadService: FileUploadService) {
    this.editor = {_id: -1,
                    ownerID: "-1",
                    address: "",
                    price: -1,
                    photoRef: "",
                    startLease: "",
                    endLease: "",
                    details: "",
                    beds: -1,
                    baths: -1,
                    kitchens: -1,
                    centralAir: false,
                    sqft: -1,
                    favoriteStatus: false};
  }

  ngOnInit(): void {
    console.log(this.editor);
  }

  public checkChange(): void{
    this.editor.centralAir = !this.editor.centralAir;
  }

  public saveChanges(): void{
    const body = this.editor;
    console.log("Updating listing "+JSON.stringify(body));
    const headers = { 'content-type': 'application/json'};
    this.http.put(this.URL, body, {'headers':headers}).subscribe((data) => {
      var results = (data as any);
      console.log("put request successful: "+JSON.stringify(results));

      var alertHTML = `<div class="alert alert-success fade show" style="display:inline;"role="alert" id="alertBox">
        Saved!
        <button type="button" class="close btn-sm alert-success" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;

      var alertElem = document.getElementById("alertBox");
      if (alertElem == null){
        document.getElementById("saveButton")!.insertAdjacentHTML('afterend', alertHTML);
      }
    });
  }
  // On file Select
  onChange(event:any) {
    this.file = event.target.files;
  }

  // OnClick of button Upload
  onUpload() {
    // this.loading = !this.loading;
    // console.log(this.file);
    this.fileUploadService.sendImageToServer(this.file);
    // .subscribe(
    //   (event: any) => {
    //     console.log(event);
    //     if (typeof (event) === 'object') {
    //       // // Short link via api response
    //       // this.shortLink = event.link;

    //       // this.loading = false; // Flag variable 

    //     }
    //   }
    // );
  }

  handleFiles(event:any) {
    var files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.type.startsWith('image/')){ continue }

      const img = document.createElement("img");
      img.classList.add("obj");
      img.height = 100;
      this.testFile = file;
      //img.setAttribute('file',file);
      var preview = document.getElementById("insertHere");
      preview!.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.

      const reader = new FileReader();
      reader.onload = (function(aImg) { return function(e:any) { aImg.src = e.target.result; }; })(img);
      reader.readAsDataURL(file);
    }
  }

  sendFiles() {
    const imgs = document.querySelectorAll(".obj");

    for (let i = 0; i < imgs.length; i++) {
      this.FileUpload(imgs[i], imgs[i].getAttribute('file'));
    }
  }

  FileUpload(img:Element, file:any) {
    const reader = new FileReader();
    //this.ctrl = createThrobber(img);
    const xhr = new XMLHttpRequest();
    //this.xhr = xhr;

    const self = this;
    // xhr.upload.addEventListener("progress", function(e) {
    //       if (e.lengthComputable) {
    //         const percentage = Math.round((e.loaded * 100) / e.total);
    //         //self.ctrl.update(percentage);
    //       }
    //     }, false);

    // xhr.upload.addEventListener("load", function(e){
    //         //self.ctrl.update(100);
    //         //const canvas = self.ctrl.ctx.canvas;
    //         //canvas.parentNode.removeChild(canvas);
    //     }, false);
    xhr.open("POST", "http://localhost:3000/fileUpload");
    xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
    reader.onload = function(evt:any) {
      xhr.send(evt.target.result);
    };
    reader.readAsBinaryString(this.testFile);
  }
}
