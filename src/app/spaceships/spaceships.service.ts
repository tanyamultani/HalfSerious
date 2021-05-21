import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })
export class SpaceshipsService {

    headers = {
        'Access-Control-Allow-Origin': 'http://localhost:4200'
      };
    httpHeaders: HttpHeaders;

    constructor(private http: HttpClient){
        this.httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('mode', 'no-cors').set('Access-Control-Allow-Origin', 'http://localhost:4200');
    }

    public getAllSpaceships(apiUrl:string): Observable<any>{
        return this.http.get( apiUrl);
    }

    public getPilot(apiUrl:string): Observable<any>{
        return this.http.get( apiUrl);
    }

}