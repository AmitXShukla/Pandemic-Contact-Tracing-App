// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BackendService } from '../../services/backend.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { fromEvent } from 'rxjs'; import { switchMap, takeUntil, pairwise } from 'rxjs/operators'
import { componentFactoryName } from '@angular/compiler';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit, AfterViewInit {
  id: any;
  toggleField = "showBadge";
  data$: Observable<any>;
  configData: any;
  fileName: string;
  docUrl: any;
  // canvas elements
  // a reference to the canvas element from our template
  //  @ViewChild('canvas') public canvas: ElementRef;
  @ViewChild('canvas', { static: true }) public canvas: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D;

  // setting a width and height for the canvas
  @Input() public width = 400;
  @Input() public height = 180;

  private cx: CanvasRenderingContext2D;
    
// signature pad
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
 
  public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300
  };

  constructor(private _route: ActivatedRoute, private _backendService: BackendService, private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getData(this.id);
    this.configData = this._backendService.getConfig("social");
  }

  toggle(filter: any) {
    this.toggleField = filter ? filter : "showBadge";
  }

  async getData(id: any) {
    this.data$ = await this._backendService.getDoc('REGISTER', id);
    this.data$.subscribe(res => {
      if (res["files"]) {
        this.docUrl = this.afStorage.ref(res["files"][0]).getDownloadURL();
      }
    });
  }
  getDocUrl(docId: any) {
    return this.afStorage.ref(docId).getDownloadURL()
  }
  printBadge() {

    // (window as any).print();
    // window.print();
    try {
      (window as any).print();
      // Print for Safari browser
      document.execCommand('print', false, null)
    } catch {
      (window as any).print();
    }
    // let printContents, popupWin;
    // printContents = document.getElementById('print-section').innerHTML;
    // popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // popupWin.document.open();
    // popupWin.document.write(`
    // <html>
    // <head>
    // <title>Print Tab</title>
    // </head>
    // <body onload()="window.print();window.close()">
    // ${printContents}
    // </body>
    // </html>
    // `)
  }

  public ngAfterViewInit() {
    // signaturePad
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API

    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    //const canvasEl = <HTMLCanvasElement> document.getElementById('mycanvas');
    this.cx = canvasEl.getContext('2d');

    // // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    // // set some default properties about the line
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#0BB';
    this.cx.fillStyle = "rgb(20,20,100)";

    // // we'll implement this method to start capturing mouse events
    this.captureEvents(canvasEl);
  }
  //signature pad funcitons
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    // console.log(this.signaturePad.toDataURL());
  }
 
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    // console.log('begin drawing');
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from the canvas element
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              // we'll stop (and unsubscribe) once the user releases the mouse
              // this will trigger a 'mouseup' event    
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point    
              pairwise()
            )
        })
      )
      // .subscribe((res: [MouseEvent, MouseEvent]) => {
      //   const rect = canvasEl.getBoundingClientRect();

      //   // previous and current position with the offset
      //   const prevPos = {
      //     x: res[0].clientX - rect.left,
      //     y: res[0].clientY - rect.top
      //   };

      //   const currentPos = {
      //     x: res[1].clientX - rect.left,
      //     y: res[1].clientY - rect.top
      //   };

      //   // this method we'll implement soon to do the actual drawing
      //   this.drawOnCanvas(prevPos, currentPos);
      // });
  }
  private drawOnCanvas(
    prevPos: { x: number, y: number },
    currentPos: { x: number, y: number }
  ) {
    // incase the context is not set
    if (!this.cx) { return; }

    // start our drawing path
    this.cx.beginPath();

    // we're drawing lines so we need a previous position
    if (prevPos) {
      // sets the start point
      this.cx.moveTo(prevPos.x, prevPos.y); // from

      // draws a line from the start pos until the current position
      this.cx.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.cx.stroke();
    }
  }
}
