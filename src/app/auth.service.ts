import { HttpClient } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';
import { LocalStorageToken } from './localstorage.token';
import { AuthServerResponse } from './interface/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, @Inject(LocalStorageToken) private localStorage:any) { }

  registerUser(username:string|null|undefined,password:string|null|undefined){
    return this.http.post<AuthServerResponse>('/api/auth/register',{username,password});
  }

  setToken(token?:string){
    this.localStorage.setItem('token',token);
  }

  getToken(){
    return this.localStorage.getItem('token');
  }

  loginUser(username:string|null|undefined,password:string|null|undefined){
    return this.http.post<AuthServerResponse>('/api/auth/login',{username,password});
  }

  isLoggedIn(){
    return this.http.get<AuthServerResponse>('/api/auth/verifytoken')
  }
}
