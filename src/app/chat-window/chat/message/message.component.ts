import { Component,EventEmitter,Input, Output } from '@angular/core';
import { Message } from '../../../interface/message.interface';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  @Input() direction: 'left' | 'right' = 'left';
  @Input() message!: Message;
  @Output() scrollNow = new EventEmitter<void>();

  ngAfterViewInit(){
    this.scrollNow.emit()
  }

}
