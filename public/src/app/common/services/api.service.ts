import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// const baseURL = 'http://localhost:4000';

import { environment } from '../../../environments/environment';

const baseURL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { 
    console.log('Base URL: ');
    console.log(baseURL);
  }


  post(URL, data): Observable<any> {
    return this.httpClient.post(`${baseURL}/${URL}`, data);
  }

  get(URL): Observable<any> {
    return this.httpClient.get(`${baseURL}/${URL}`);
  }

  put(URL, id, data): Observable<any> {
    return this.httpClient.put(`${`${baseURL}/${URL}`}/${id}`, data);
  }

  delete(URL, id): Observable<any> {
    return this.httpClient.delete(`${`${baseURL}/${URL}`}/${id}`);
  }

}
