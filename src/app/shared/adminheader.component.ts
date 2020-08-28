import { Component, OnInit, Input } from '@angular/core';
import { BackendService} from '../services/backend.service';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {

  @Input() imageUrl: string;
  @Input() pageTitle: string;
  @Input() helpType: string;
  configData;

  constructor(private _backendService: BackendService) { }

  ngOnInit(): void {
    this.configData = this._backendService.getConfig("helptext");
  }

}