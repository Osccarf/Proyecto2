import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FileUpload } from './class/file-upload';
import { FaceapiService } from './services/faceapi.service';
import * as FileSaver from 'file-saver';
import { OnInit } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  items: Observable<any[]>;
  itemRef: AngularFireObject<any>;

  
  private basePath = '/';
  meta: Observable<any>;

  profileUrl: Observable<string | null>;
  fileUploads: AngularFireList<any[]>;
  imageData: any;
  blobFile: any;
  itemsReal: any[];
  constructor(public db: AngularFireDatabase, public storage: AngularFireStorage, private faceApiService: FaceapiService, private sanitizer: DomSanitizer, private http: Http) {
    //this.getFileUploads()
    this.itemsReal = [];
    this.items = db.list('/ejecucion').valueChanges();
    this.itemRef = db.object('/faces');


    this.items.subscribe(items => {
      items.forEach(item => {
        console.log(item);
        this.itemsReal.push(item);
      });
    });
  }

  obtenerFaceAPI(item:string) {

    //this.itemsReal.forEach(item => {

      //let messageSuccess = true;
      //setTimeout(() => {    //<<<---    using ()=> syntax
        this.getFaceAPIDataFromImgURL(item);
      //}, 3000);
    //});

  }


  ngOnInit(): void {
  }


  public getFaceAPIDataFromImgURL(nombreDeLaImagenURL: string) {
    let nombreDeLaImagenURL1 = 'https://firebasestorage.googleapis.com/v0/b/test-131de.appspot.com/o/';
    let nombreDeLaImagenURL2 = 'profile.png?alt=media';

    let fullURLImage = nombreDeLaImagenURL1 + nombreDeLaImagenURL + nombreDeLaImagenURL2;

    setTimeout(() => {    //<<<---    using ()=> syntax
      this.http.get(fullURLImage, {
        responseType: ResponseContentType.Blob
      })
        .toPromise()
        .then((res: any) => {
          let blob = new Blob([res._body], {
            type: res.headers.get("Content-Type")
          });
          console.log(blob);
          console.log(nombreDeLaImagenURL);
          this.faceApiService.postData(this.blobToFile(blob, nombreDeLaImagenURL + '.jpg')).subscribe(res => this.save(res , nombreDeLaImagenURL));
          ;
        });
    }, 4000);

  }


  public blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;

    return <File>theBlob;
  }

  public save(responseFACE: any,idName: string) {
    this.itemRef.set({  items : responseFACE });
    console.log(responseFACE);
  }

}