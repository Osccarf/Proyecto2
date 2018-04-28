import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpEventType,
  HttpParams
} from '@angular/common/http';
import { IfObservable } from 'rxjs/observable/IfObservable';


@Injectable()
export class FaceapiService {


  private headers = new Headers({ 'Content-Type': 'application/json' });

  url = 'https://api-face.sightcorp.com/api/detect/';


  constructor(private http: HttpClient) { }

  postData(fileItem: File) : Observable<any>   {

    let myheaders = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    myheaders.append('Content-Type', undefined);

    let formData: FormData = new FormData();

    formData.append('img', fileItem);
    formData.append('app_key', '0925194c069b484eb804da9aee8de107');

    return this.http.post(this.url, formData, { headers: myheaders }).map(
      res =>  res)
      .catch(this.handleError);
      ;
  }

  
  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Observable.throw(error.message || error);
}

}
