import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController,  NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { UserDataProvider } from '../../providers/user-data/user-data';
/**
 * Generated class for the CreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
	name:"create"
})
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

	public ideaCreateForm:FormGroup;
	public loading:Loading;

	constructor(
		public navCtrl: NavController, 
		public loadingCtrl: LoadingController, 
		public alertCtrl: AlertController, 
		public authProvider: AuthProvider, 
		public formBuilder: FormBuilder,
		public userDataProvider : UserDataProvider) {
	    this.ideaCreateForm = formBuilder.group({
	      title: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
	      password: ['', Validators.compose([Validators.minLength(6),Validators.required])]
	    });
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad LoginPage');
	}

	loginUser(): void {
	  if (!this.ideaCreateForm.valid){
	    console.log(this.ideaCreateForm.value);
	  } else {
	    console.log("error");
	  }
	}	

}
