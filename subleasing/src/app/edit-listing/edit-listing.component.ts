import { Component, OnInit, Input, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {ListingModel} from '../listing-card/listing-model'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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

    // Create Variable for your file and formdata.
    selectedFile: File | null = null;
    fd = new FormData();


  constructor(private http: HttpClient) {
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

  // Once the file change is detected append your file to your formdata and on submit post the request.
  handleFileInput(event:any) {
    console.log("change event");
    this.selectedFile = <File>event.target.files[0];
    this.fd.set('image', this.selectedFile, this.selectedFile.name);

    const file =  this.selectedFile;

    if (file.type.startsWith('image/')){ 
      const img = document.createElement("img");
      img.classList.add("obj");
      img.classList.add("card-img-top");
      img.alt = "apartment picture";
      img.id = "photoPreviewImg";
      this.testFile = file;
      //img.setAttribute('file',file);
      var preview = document.getElementById("photoPreviewDiv");
      preview!.removeChild(preview!.childNodes[0]);
      preview!.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.

      const reader = new FileReader();
      reader.onload = (function(aImg) { return function(e:any) { aImg.src = e.target.result; }; })(img);
      reader.readAsDataURL(file);

      this.editor.photoRef = "assets/images/"+file.name;

      // http://localhost:3000/assets/images/16495th.jpg
      // http://localhost:3000/assets/images/1518421-the-legend-of-zelda-breath-of-the-wild__32.jpg
      // http://localhost:3000/assets/images/830180.png
      this.onSubmit();
    }
    
  }

  onSubmit() {
    console.log("submit event");
    console.log(this.fd);
    this.http.post("http://localhost:3000/fileUpload", this.fd)
      .subscribe((data)=>{console.log(data);});
      this.http.post("http://localhost:3000/fileUpload2", this.fd)
      .subscribe((data)=>{console.log(data);});
    var alertHTML = `<div class="alert alert-success fade show" style="display:inline;"role="alert" id="alertBox">
      New Image Saved To Server! You must still click "Save Edits" to update the listing
      <button type="button" class="close btn-sm alert-success" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`;

    var alertElem = document.getElementById("alertBox");
    if (alertElem == null){
      document.getElementById("photoPreviewDiv")!.insertAdjacentHTML('afterend', alertHTML);
    }
  }

}
