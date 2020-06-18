import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DocsService {
  SERVER_URL: string = "http://68.183.42.41:8013/api/v1";

  constructor(private httpClient: HttpClient) { }

  public upload(formData) {

    return this.httpClient.post<any>(`${this.SERVER_URL}/uploadDoc`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  public getDocs(sessionID, body) {
    return this.httpClient.post(`${this.SERVER_URL}/documents`, sessionID, body)
  }

}
