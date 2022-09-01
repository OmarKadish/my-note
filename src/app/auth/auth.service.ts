import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{ map } from 'rxjs/operators';

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private url = 'http://noteappbackend/api';
  constructor(private http: HttpClient) { }

  register(user:User){
    return this.http.post(this.url+'/register', user);
  }

  login(credentials:User): Observable<string> {
    return this.http.post<{token: string}>(this.url+'/login', credentials).pipe(
      map(response => response.token)
    );
  }

  removeItem(item) {
     localStorage.removeItem(item);
  }
}
