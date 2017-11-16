import {  Component,
          ElementRef,
          ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Content } from 'ionic-angular';

import { DateTime } from '../../app/date-time'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) content: Content;
  @ViewChild('canvas') canvasEl : ElementRef;

  private dt: DateTime = new DateTime();
  private canvas : any;
  private context: any;
  private tm: any;
  private canvasWidth = 500;
  private clockWidth = 400;
  private pointWidth = 5;
  private hoursLength = 100;
  private minutesLength = 180;
  private secondsLength = 192;

  private dim: any;
  private contentHeight;

  constructor(public navCtrl: NavController) {
    this.tm = setInterval(() => {
      this.dim = this.content.getContentDimensions();
      if (this.dim) {
        this.contentHeight = Math.floor(this.dim.contentHeight * 60 / 100);
        this.canvasWidth = this.contentHeight;

        this.canvas.width = this.canvas.height = this.canvasWidth;
        this.clockWidth = this.canvas.width - 20;
        this.hoursLength = this.clockWidth / 2;
        this.minutesLength = this.clockWidth - 20;
        this.secondsLength = this.clockWidth - 10;
        this.initialiseCanvas();
        this.drawClock();
      }
    }, 1000);
  }

  ionViewDidLoad() : void {
    this.canvas = this.canvasEl.nativeElement;
  }

  initialiseCanvas() : void {
    if (this.canvas.getContext) {
      this.setupCanvas();
    }
  }

  setupCanvas() : void {
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = "rgba(255,255,255,0)";
    this.context.fillRect(  0,
                            0,
                            this.canvas.width,
                            this.canvas.height);
  }

  clearCanvas() : void {
    this.context.clearRect( 0,
                            0,
                            this.canvas.width,
                            this.canvas.height);
    this.setupCanvas();
  }

  drawClock() {
    let deg;

    this.clearCanvas();
    this.context.beginPath();

    // Pourtour horloge
    this.context.arc( this.canvas.width / 2,
                      this.canvas.height / 2,
                      this.clockWidth / 2,
                      0,
                      2 * Math.PI);
    this.context.lineWidth = 2;
    this.context.strokeStyle = '#000';
    this.context.stroke();
    this.context.fillStyle = 'rgba(255,255,255,0.6)';
    this.context.fill();

    for (let i = 0; i < 360; i += 30) {
      this.drawPoint(i);
    }

    // Heures
		deg = ((this.dt.hours % 12) + (this.dt.minutes / 60)) * 30;
    this.drawLine(deg, this.hoursLength);

    // Minutes
		deg = (this.dt.minutes + (this.dt.seconds / 60)) * 6;
    this.drawLine(deg, this.minutesLength);

    // Secondes
		deg = this.dt.seconds * 6;
    this.drawLine(deg, this.secondsLength);

    // Point central
    this.context.beginPath();
    this.context.arc( this.canvas.width / 2,
                      this.canvas.height / 2,
                      10,
                      0,
                      2 * Math.PI);
    this.context.lineWidth = 1;
    this.context.strokeStyle = '#000';
    this.context.stroke();
    this.context.fillStyle = "#000";
    this.context.fill();

  }

  drawPoint(deg) {
		deg = -deg;

    this.context.beginPath();
		let rad = deg * Math.PI / 180;
		let y = Math.cos(rad);
		let x = Math.sin(rad);
    this.context.arc( (x * this.clockWidth / 2) + (this.canvas.width / 2),
                      (y * this.clockWidth / 2) + (this.canvas.height / 2),
                      5,
                      0,
                      2 * Math.PI);
    this.context.lineWidth = 1;
    this.context.strokeStyle = '#000';
    this.context.stroke();
    this.context.fillStyle = "#000";
    this.context.fill();
  }

  drawLine(deg: number, len: number): void {
		deg = -deg;
		let rad = deg * Math.PI / 180;
		let y = Math.cos(rad);
		let x = Math.sin(rad);

    this.context.beginPath();

    this.context.moveTo(  this.canvas.width / 2,
                          this.canvas.height / 2);
    this.context.lineTo(
      (this.canvas.width / 2) - (x * len / 2),
      (this.canvas.width / 2) - (y * len / 2) );
    this.context.strokeStyle = '#000';
    this.context.lineWidth = 1;
    this.context.stroke();
  }
}
