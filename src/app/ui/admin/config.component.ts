import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from '../../services/backend.service';

interface Theme {
  value: string;
  viewValue: string;
}
interface YesNo {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  
    data$: Observable<any>;
    toggleField: string;
    state: string = '';
    savedChanges = false;
    error: boolean = false;
    errorMessage: String = "";
    dataLoading: boolean = false;
    private querySubscription: any;
    themes: Theme[] = [
      {value: 'primary', viewValue: 'Primary - blue'},
      // {value: 'accent', viewValue: 'Accent - pink'},
      // {value: 'warn', viewValue: 'Warn - red'}
    ];
    yesnos: YesNo[] = [
      {value: 'yes', viewValue: 'Yes'},
      {value: 'no', viewValue: 'No'}
    ];

  constructor(private _backendService: BackendService) { }

  ngOnInit(): void {
    this.getDoc();
  }
  setData(formData: any) {
    this.dataLoading = true;
    this._backendService.updateDoc("CONFIG", "config_doc", formData).then(res => {
      if (res) {
        this.savedChanges = true;
        this.error = false;
        this.errorMessage = "";
        this.dataLoading = false;
      }
    }
    ).catch(err => {
      if (err) {
        this.error = true;
        this.errorMessage = err.message;
        this.dataLoading = false;
      }
    }
    );
  }
  getDoc() {
    this.dataLoading = true;
    this.data$ = this._backendService.getDoc("CONFIG","config_doc");
    this.dataLoading = false;
  }
}
