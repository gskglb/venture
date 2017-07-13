import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the DetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
	name:"details"
})
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

	public passedIdea : any;

	imageToShare : any = null;
	urlToShare : any ="https://www.google.co.in";

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public socialSharing : SocialSharing) {
		this.passedIdea = this.navParams.get('item');
		console.log(this.passedIdea);
	}

	ionViewDidLoad() {

	}

	newTapped($event, idea) {
		this.navCtrl.push('create'); 
	}

	smsShare() {
		this.socialSharing.shareViaSMS("shareViaSMS", "mobile-no").then(() => {
		  console.log("shareViaSMS: Success");
		}).catch(() => {
		  console.error("shareViaSMS: failed");
		});
	}

	whatsappShare() {
		this.socialSharing.shareViaWhatsApp("shareViaWhatsApp", this.imageToShare, this.urlToShare).then(() => {
		  console.log("shareViaWhatsApp: Success");
		}).catch(() => {
		  console.error("shareViaWhatsApp: failed");
		});
	}
	facebookShare() {
		this.socialSharing.shareViaFacebook("shareViaFacebook", this.imageToShare, this.urlToShare).then(() => {
		  console.log("shareViaFacebook: Success");
		}).catch(() => {
		  console.error("shareViaFacebook: failed");
		});
	}		

}
