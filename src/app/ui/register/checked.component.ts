import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checked',
  templateUrl: './checked.component.html',
  styleUrls: ['./checked.component.css']
})
export class CheckedComponent {
  toggleField = "showRegister";
  constructor() {}
  
  toggle(filter: any) {
    this.toggleField = filter ? filter : "showRegister";
  }
}
