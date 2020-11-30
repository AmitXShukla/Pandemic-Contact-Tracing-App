import { Component, OnInit } from '@angular/core';
import { moveIn, fallIn } from '../../shared/router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BackendService } from '../../services/backend.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],
  animations: [moveIn(), fallIn()],
  host: { '[@fallIn]': '' }
})

export class CheckinComponent implements OnInit {
  currentDTTM: any;
  id: any;
  toggleField = "Guest";
  stateCtrl = new FormControl();
  filteredStates: Observable<any[]>;
  data$: Observable<any>;
  registerID = "";
  fileName: string;
  docUrl: any = [];
  showFileUpload: boolean = false;

  states: any[];

  constructor(private _route: ActivatedRoute, private _formBuilder: FormBuilder, 
    private _backendService: BackendService, private afStorage: AngularFireStorage, private _router: Router) {
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
  }
  ngOnInit(): void {
    this.currentDTTM = this._backendService.timestamp;
    this._route.paramMap.subscribe(params => {
      //this.id = params.get('id');
      this.toggleField = params.get('id');
    });
    this.getData();
  }

  toggle(filter: any) {
    this.toggleField = filter ? filter : "Guest";
  }

  onSubmit(formData: any) {
    return this._backendService.setDoc('REGISTER', formData).then(res => {
      if (res) {
        this.registerID = res;
        this._router.navigate(['/terms', this.registerID]);
      }
    }
    ).catch(err => console.log(err));
  }

  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  async getData(formData?: any) {
    let x;
    this.data$ = await this._backendService.getDocs('EMPLOYEE', formData);
    this.data$.subscribe(res => 
      {
        for (let r in res) {
          if(res[r]["files"]) {
            this.afStorage.ref(res[r]["files"][0]).getDownloadURL().subscribe(result => 
              {
                this.docUrl.push(result);
              }
            )
          } else {
            this.docUrl.push("");
          }
        }
      });   
  }
}