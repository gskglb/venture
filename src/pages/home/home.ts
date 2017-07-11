import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	public isLoggedIn: any = false;	

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

}
