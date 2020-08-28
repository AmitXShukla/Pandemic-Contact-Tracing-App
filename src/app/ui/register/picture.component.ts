import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})

export class PictureComponent implements OnInit, OnDestroy {
  registerID;
  showFileUpload: boolean = true;
  lat: number;
  lng: number;
  data;
  stopCondition = false;
  private querySubscription;

  constructor(private _route: ActivatedRoute) { }

ngOnInit() {
  this._route.paramMap.subscribe(params => {
    this.registerID = params.get('id');
  });
  const secondsCounter = interval(2000);
  // Subscribe to begin publishing values
  this.querySubscription = secondsCounter.subscribe(n =>
    //console.log(`It's been ${n} seconds since subscribing!`)
    this.getLocations()); 
}

getLocations() {
  var positionOption = { enableHighAccuracy: false, maximumAge: Infinity, timeout: 60000 };
  var gpsSunccuss = function (currentPosition) {
    //use gps position
  };
  var gpsFailed = function () {
    //use some 3rd party position solution(get position by your device ip)
    //getPositionBy3rdParty();
  };

  /// locate the user
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.data = { "lat": position.coords.latitude, "long": position.coords.longitude };
      console.log(this.data);
      // below comment is what writes to database
      // commenting this code to block GPS location capturing
      // user must write their own code to capture user's GPS location
      // please consult with local authorities/government laws before capturing user's lcoation

      // this._backendService.setLocations(this.data).subscribe((res)=> console.log("Success"));
    }), gpsFailed, positionOption);
  }
}
ngOnDestroy(){
  if(this.querySubscription){
    // uncomment this if you want app to continuosly capture location when app is in memory
    this.querySubscription.unsubscribe();
  }
}
}