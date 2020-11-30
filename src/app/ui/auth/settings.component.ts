import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../../shared/router.animations';
import { BackendService } from '../../services/backend.service';
import { DBInBoundData, DBOutBoundData } from '../../services/datamodel';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [moveIn(), fallIn()],
  host: { '[@fallIn]': '' }
})
export class SettingsComponent implements OnInit {

  isAdmin: boolean = false;
  state: string = ''; // required for router animation
  dataLoading: boolean = false; // spinner boolean
  error: boolean = false;
  errorMessage: String = "";
  IBData: DBInBoundData; // inbound data
  OBData: DBOutBoundData; // outbound data

  constructor(private _router: Router, private _backendService: BackendService) { }

  ngOnInit() {
    this.IBData = {
      error: false,
      statusCode: 0, // 0 initial, 1 saved, 2 others
      statusMessage: "", // error or success message from server
      rowCount: 0, // number of rows returned
      data: "" // actual data
    } // inbound data
    this.OBData = {
      rowCount: 1,
      recordType: "login",
      data: ""
    }; // outbound data
    if (window.localStorage.getItem("authuitoken")) {
      this.isAdmin = true;
    }
  }

  loginWithCode(formData: any) {
    this.dataLoading = true;
    this.OBData.data = formData;
    return this._backendService.getDoc("LICENSE", this.OBData.data.authcode).subscribe((res: any) => {
      if (res !== undefined) {
        this.IBData.error = false;
        this.isAdmin = true;
        window.localStorage.setItem("authuitoken", res["company"]);
      } else {
        this.IBData.error = true;
      }
      this.dataLoading = false;
    },
      (error) => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
      },
      () => {
        this.dataLoading = false;
      });
  }

  logout() {
    window.localStorage.removeItem("authuitoken");
    this._router.navigate(['/login']);
  }
}
