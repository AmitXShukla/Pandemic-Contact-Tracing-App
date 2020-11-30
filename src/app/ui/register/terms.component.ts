import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})

export class TermsComponent implements OnInit {
  registerID: any;
  showFileUpload: boolean = true;
  toggleField = "showBadge";

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.registerID = params.get('id');
    });
  }
  toggle(filter: any) {
    this.toggleField = filter ? filter : "showBadge";
  } 
}