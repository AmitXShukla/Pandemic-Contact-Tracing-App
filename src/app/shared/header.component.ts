import { Component, OnInit, Input } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() imageUrl: string;
  @Input() pageTitle: string;
  @Input() helpType: string;
  configData;

  constructor(private ngZone: NgZone, private _backendService: BackendService,
    private _route: Router) { }

  ngOnInit(): void {
    this.configData = this._backendService.getConfig("helptext");
  }

  routeLogin() {
    this.ngZone.run(() =>
      this._route.navigate(['/login'])
    );
  }
}