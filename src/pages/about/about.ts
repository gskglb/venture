import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { IdeaListingProvider } from '../../providers/idea-listing/idea-listing';

@IonicPage({
	name:"about"
})
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  zone: NgZone;
  public myIdeas;
  public countOfMyIdeas = 0;
  public complete: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public ideaProvider: IdeaListingProvider
  	) {
    let loader = this.loadingCtrl.create({
      content: "Loading your favorite Ideas..."
    });
    loader.present();
    this.ideaProvider.getMyIdeas().then(data => {
        this.myIdeas = data;
        this.countOfMyIdeas = Object.keys(data).length;
        this.complete=true;
        loader.dismiss();

    });
  }

}
