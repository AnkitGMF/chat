import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatComponent } from './chat-window/chat/chat.component';
import { ChatFormComponent } from './chat-window/chat-form/chat-form.component';
import { MessageComponent } from './chat-window/chat/message/message.component';
import { ChatRoomComponent } from './sidenav/chat-room/chat-room.component';
import { MainChatComponent } from './main-chat/main-chat.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { NewChatModalComponent } from './new-chat-modal/new-chat-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    ChatWindowComponent,
    ChatComponent,
    ChatFormComponent,
    MessageComponent,
    ChatRoomComponent,
    MainChatComponent,
    LoginComponent,
    SignupComponent,
    NewChatModalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule,ReactiveFormsModule,HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
