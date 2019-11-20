import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class BackendService {

  constructor(private http:HttpClient) { }

  private serviceUrl = 'https://hn.algolia.com/api/v1/search_by_date?tags=story';
  
  getPosts():Observable<any>{
    return(this.http.get(this.serviceUrl));
  }
}
