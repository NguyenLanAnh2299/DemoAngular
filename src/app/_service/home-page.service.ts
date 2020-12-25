import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../_model/user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'Application/json'})
};
const getAllUser = 'https://5fdb378791f19e0017333ccb.mockapi.io/user/api';
const deleteUser = 'https://5fdb378791f19e0017333ccb.mockapi.io/user/api/';
const addUser = 'https://5fdb378791f19e0017333ccb.mockapi.io/user/api';
const  updateUser = 'https://5fdb378791f19e0017333ccb.mockapi.io/user/api/';
@Injectable({
  providedIn: 'root'
})
export class HomePageService {
  constructor(private httpClient: HttpClient) { }
  // tslint:disable-next-line:typedef
  getAll() {
    return this.httpClient.get<User[]>(getAllUser).pipe();
  }
  Delete(id: number): Observable<any> {
    return this.httpClient.delete(deleteUser + id).pipe();
  }
  // tslint:disable-next-line:typedef
  public addUser(objUser: any) {
    return this.httpClient.post<any>(addUser, objUser);
  }
  update(rq: any): Observable<any> {
    return this.httpClient.put(updateUser + rq.id, rq).pipe();
  }
  getUser(id: number): Observable<any> {
    return this.httpClient.get(updateUser + id).pipe();
  }
}
