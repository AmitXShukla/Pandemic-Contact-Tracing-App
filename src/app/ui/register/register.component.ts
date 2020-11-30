import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendService } from  '../../services/backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  configData: Observable<any>;
  toggleField = "showRegister";
  constructor(private _backendService: BackendService) { }
  
  toggle(filter: any) {
    this.toggleField = filter ? filter : "showRegister";
  }

  ngOnInit(): void {
    //this.configData = this._backendService.getConfig("social");
    this.configData = this._backendService.getConfigData();
  }
}