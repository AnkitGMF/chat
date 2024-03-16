import { Component } from '@angular/core';
import { chatRooms } from '../../../dummy';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  chatRooms = chatRooms;
}
