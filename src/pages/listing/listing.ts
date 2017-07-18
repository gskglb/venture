import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { IdeaListingProvider } from '../../providers/idea-listing/idea-listing';
import { UserDataProvider } from '../../providers/user-data/user-data';
/**
 * Generated class for the ListingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
	name:"listing"
})
@Component({
  selector: 'page-listing',
  templateUrl: 'listing.html',
})
export class ListingPage {

	passedCategory:any;
	ideas:any;
	public isLoggedIn: any = false;	
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public ideaProvider: IdeaListingProvider,
		public loadingCtrl: LoadingController,
		public userDataProvider: UserDataProvider) {
			this.passedCategory = this.navParams.get('category');
			userDataProvider.hasLoggedIn().then((hasLoggedIn) => {
				console.log(hasLoggedIn);
			   	this.isLoggedIn = hasLoggedIn;
			});			
	}

	ionViewDidLoad() {
		let loader = this.loadingCtrl.create({
      		content: "Getting fresh ideas just for you..."
    	});
    	loader.present();
    	this.ideaProvider.getFreshIdeas().then(data => {
      		loader.dismiss();
      		this.ideas = data;
      		//this.ideas = this.ideas.filter(item => item.category == this.passedCategory);
    	});
	}

	ideaTapped($event, idea) {
		this.navCtrl.push("details", {
			item:idea
		});
	}
	newTapped($event, idea) {
		this.navCtrl.push('create'); 
	}
	goToLogIn(){ 
		this.navCtrl.push('sign-in'); 
	}

	goToProfile(){ 
		this.navCtrl.push('profile'); 
	}

}
