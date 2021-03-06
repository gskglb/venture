import { NavController } from 'ionic-angular';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Component, trigger, transition, style, state, animate, keyframes } from '@angular/core';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  @ViewChild(Slides) slides: Slides;

  public skipMsg: string = "Skip Intro";

  constructor(
    private navCtrl: NavController,
    
  ) {

  }

	ionViewDidLoad() {
    
  }


  goToLogIn() {
    this.navCtrl.push('sign-in');
  }

  goToProfile() {
    this.navCtrl.push('profile');
  }

  // This function is an event to listen to clicks on elements.
  // The SingleItem Page has been included to be passed in this function.
  freshIdeasTapped($event, category) {
    this.navCtrl.push('listing', {
      category: 'Fresh Ideas'
    });
  }

  skip() {
    this.navCtrl.setRoot("sign-in");

  }

  slideChanged() {
    if (this.slides.isEnd())
      this.skipMsg = "Alright, I got it";
  }

  state: string = 'x';

  slideMoved() {
    if (this.slides.getActiveIndex() >= this.slides.getPreviousIndex())
      this.state = 'rightSwipe';
    else
      this.state = 'leftSwipe';
  }

  animationDone() {
    this.state = 'x';
  }

}
