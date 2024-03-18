import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject , Observable } from 'rxjs';
import io from 'socket.io-client';
import { AuthService } from './auth.service';
import { Message } from './interface/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

  currRoom:string='';

  socket = io("ws://localhost:3000", {
    transports: ["websocket"],
  });

  private modalSubject = new Subject<string|null>();
  modalState = this.modalSubject.asObservable();

  private roomSubject = new Subject<string>();
  roomState = this.roomSubject.asObservable();


  constructor(private http:HttpClient) {
  }

  openModal(modalId: string) {
    this.modalSubject.next(modalId);
  }

  closeModal() {
    this.modalSubject.next(null);
  }

  checkUserExists(username:string|null){
    return this.http.post<{exists:boolean}>('/api/checkuserexists',{username});
  }

  createChatRoom(name:string|null,users:string[]){
    console.log('Room Service Called')
    this.socket.emit('createChatRoom',{name,users});
  }


  getChatRooms(){
    let observable = new Observable<{name:string,chatRoomId:string}>(observer => {
      this.socket.on('chatRoomCreated',(data)=>{
        observer.next(data);
      })

      return () => {
        this.socket.disconnect();
      }
    })

    return observable;
  }

  selectRoom(room:string){
    this.roomSubject.next(room);
    this.currRoom = room;
    console.log(this.currRoom)
  }

  getMessages(){
    let observable = new Observable<Message>(observer => {
      this.socket.on('receive message',(data)=>{
        observer.next(data);
      })

      return () => {
        this.socket.disconnect();
      }
    })

    return observable;
  }

  loadExistingMessages(chatRoomId:string){
    return this.http.post<Message[]>(`/api/message`,{chatRoomId});
  }

}
