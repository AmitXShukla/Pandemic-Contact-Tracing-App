import { Component, OnInit } from '@angular/core';
import { moveIn, fallIn } from '../../shared/router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { map, defaultIfEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  animations: [moveIn(), fallIn()],
  host: { '[@fallIn]': '' }
})

export class CheckoutComponent implements OnInit {
  currentDTTM;
  isCheckedOut: boolean = false;
  data$: Observable<any>;
  toggleField = "Guest";
  toggleSearch: boolean = false;
  docData;

  constructor(private _route: ActivatedRoute, private _backendService: BackendService) {}
  ngOnInit(): void {
    this.currentDTTM = this._backendService.timestamp;
  }

  onSubmit(formData){
      this.data$ = this._backendService.getDocs('REGISTER', formData)
  }
  onCheckOut(formData) {
    this._backendService.updateCheckOutDoc('REGISTER', formData);
    this.isCheckedOut = true;
    // return this._backendService.updateCheckOutDoc('REGISTER', formData).then(res => {
    //   if (res) {
    //     this.isCheckedOut = true;
    //   }
    // }
    // ).catch(err => console.log(err));
  }
  toggle(filter) {
    this.toggleField = filter ? filter : "Guest";
  }
  
}