import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage  } from 'angularfire2/storage';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FileUpload } from './class/file-upload';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  items: Observable<any[]>;
  private basePath = '/';
  meta: Observable<any>;

  profileUrl: Observable<string | null>;

  fileUploads: AngularFireList<any[]>;
 

  itemsReal: any[];
  constructor(public db: AngularFireDatabase, public storage: AngularFireStorage ) {
    this.getFileUploads()
    this.itemsReal = [];
    this.items = db.list('people').valueChanges();

    this.items.subscribe(items => {
      items.forEach(item => {
        //console.log(item.age);
        //console.log(item.gender);
        //console.log(item.mood);
        this.itemsReal.push(item.age);
      });
    });
    const itemsRef = db.list('people');
    // to get a key, check the Example app below
    itemsRef.set('key-of-some-dat1a', { size: 'sss' });
    //console.log(this.itemsReal);
  }

  getFileUploads() {
    const ref =  this.storage.ref("/");
    //this.meta = ref.getMetadata()
    const storageRef = this.storage.ref("").child('files/1521321567profile.png');
    storageRef.getDownloadURL().subscribe(url => console.log(url));

    //const ref2 = ;
    //this.profileUrl = ref2.getDownloadURL();

  }

}