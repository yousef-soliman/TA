import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DocsService {
  SERVER_URL: string = 'http://68.183.42.41:8013/api/v1';
  constructor(private httpClient: HttpClient) {}

  public upload(sessionID, formData) {
    let params = new HttpParams().set('session_id', sessionID);
    return this.httpClient.post<any>(`${this.SERVER_URL}/uploadDoc`, formData, {
      reportProgress: true,
      observe: 'events',
      params: params,
    });
  }

  public getDocs(sessionID, body) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let params = new HttpParams().set('session_id', sessionID);
    return this.httpClient.post(`${this.SERVER_URL}/documents`, body, {
      headers: headers,
      params: params,
    });
  }
}
