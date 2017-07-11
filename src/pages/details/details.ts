import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.passedIdea = this.navParams.get('item');
		console.log(this.passedIdea);
	}

	ionViewDidLoad() {

	}

}
