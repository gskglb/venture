import { NavController } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Component, trigger, transition, style, state, animate, keyframes } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    
  trigger('bounce', [
        state('*', style({
            transform: 'translateX(0)'
        })),
        transition('* => rightSwipe', animate('700ms ease-out', keyframes([
          style({transform: 'translateX(0)', offset: 0}),
          style({transform: 'translateX(-65px)',  offset: 0.3}),
          style({transform: 'translateX(0)',     offset: 1.0})
        ]))),
        transition('* => leftSwipe', animate('700ms ease-out', keyframes([
          style({transform: 'translateX(0)', offset: 0}),
          style({transform: 'translateX(65px)',  offset: 0.3}),
          style({transform: 'translateX(0)',     offset: 1.0})
        ])))
    ])
  ]
})
export class HomePage {
	@ViewChild(Slides) slides: Slides;
	public isLoggedIn: any = false;	
	public skipMsg: string = "Skip Intro";

	constructor(
		public navCtrl: NavController,
		public userDataProvider: UserDataProvider,) {

		userDataProvider.hasLoggedIn().then((hasLoggedIn) => {
			console.log(hasLoggedIn);
		   	this.isLoggedIn = hasLoggedIn;
		});
	}

	goToLogIn(){ 
		this.navCtrl.push('sign-in'); 
	}

	goToProfile(){ 
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
    	this.navCtrl.setRoot("tabs");

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
