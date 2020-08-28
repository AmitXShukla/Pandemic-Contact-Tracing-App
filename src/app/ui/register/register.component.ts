import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from  '../../services/backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  configData;
  toggleField = "showRegister";
  constructor(private _backendService: BackendService) { }
  
  toggle(filter) {
    this.toggleField = filter ? filter : "showRegister";
  }

  ngOnInit(): void {
    //this.configData = this._backendService.getConfig("social");
    this.configData = this._backendService.getConfigData();
  }
}