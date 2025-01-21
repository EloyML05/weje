import { Injectable } from '@angular/core';
import { ILogin } from '../model/login.interface';
import { serverURL } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverURL: string = serverURL + '/auth';

constructor(private oHttp: HttpClient) { }
getToken(Login:ILogin): Observable<string> {
  
  let URL: string = "";
  URL += this.serverURL;
  URL += "/login";
  return this.oHttp.post<string>(URL, Login);
}
}
