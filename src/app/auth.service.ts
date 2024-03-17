import { HttpClient } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';
import { LocalStorageToken } from './localstorage.token';
import { AuthServerResponse } from './interface/auth.interface';
import { User } from './interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, @Inject(LocalStorageToken) private localStorage:any) { }

  me!:User;

  getExistingChatRooms(){
    return this.me.chatRooms;
  }

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
    return this.http.post<{success:boolean,token:string,user:User}>('/api/auth/login',{username,password});
  }

  getUser(){
    return this.http.get<{success:boolean,user:User,message:string}>('/api/auth/user');
  }

  isLoggedIn(){
    return this.http.get<AuthServerResponse>('/api/auth/verifytoken')
  }
}
