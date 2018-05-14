import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FileUpload } from './class/file-upload';
import { FaceapiService } from './services/faceapi.service';
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
  ejecucionItems: Observable<any[]>;
  facesItems: Observable<any[]>;

  facesFirebase: AngularFireObject<any>;


  private basePath = '/';
  meta: Observable<any>;

  profileUrl: Observable<string | null>;
  fileUploads: AngularFireList<any[]>;
  imageData: any;
  blobFile: any;
  itemsReal: any[];
  constructor(public db: AngularFireDatabase, public storage: AngularFireStorage, private faceApiService: FaceapiService, private sanitizer: DomSanitizer, private http: Http) {
    this.itemsReal = [];
    this.ejecucionItems = db.list('/ejecucion').valueChanges();
    this.facesItems = db.list('/faces').valueChanges();
    this.facesFirebase = db.object('/faces');
    this.recargarResultados();
  }


  recargarResultados() {

    this.ejecucionItems.subscribe(items => {
      items.forEach(item => {
        //console.log(item);
        let itemValueFace = {};
        this.facesItems = this.db.list('/faces/'+item).valueChanges();
        this.facesItems.subscribe(item2 => {
          if(item2.length > 0){
            console.log('inicia');
            console.log(item2);
            console.log(item);
            itemValueFace = item2;
            console.log('termina');
            item2.forEach(item3 => {
            });
          }
          this.itemsReal.push({ item : itemValueFace, id: item});
        });
        
      });
    });
    console.log(this.itemsReal);
  }

  obtenerFaceAPI(item: string) {
    this.getFaceAPIDataFromImgURL(item);
  }

  ngOnInit(): void {
  }

  public getFaceAPIDataFromImgURL(nombreDeLaImagenURL: string) {
    let nombreDeLaImagenURL1 = 'https://firebasestorage.googleapis.com/v0/b/imagenes-b75e3.appspot.com/o/';
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
          this.faceApiService.postData(this.blobToFile(blob, nombreDeLaImagenURL + '.jpg')).subscribe(res => this.save(res, nombreDeLaImagenURL));

          this.recargarResultados();
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

  public save(responseFACE: any, idName: string) {
    this.facesFirebase.update({ [idName]: responseFACE });
    console.log(responseFACE);
  }
}