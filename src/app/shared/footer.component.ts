import { Component, OnInit } from '@angular/core';
import { BackendService } from  '../services/backend.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  // configData: any;
  configData: Observable<any>;

  constructor(private _backendService: BackendService) { }

  ngOnInit(): void {
    //this.configData = this._backendService.getConfig("social");
    this.configData = this._backendService.getConfigData();
  }
}
