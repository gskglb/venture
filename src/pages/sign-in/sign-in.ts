import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController,  NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { UserDataProvider } from '../../providers/user-data/user-data';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
	name: 'sign-in'
})
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

	public loginForm:FormGroup;
	public loading:Loading;

	constructor(
		public navCtrl: NavController, 
		public loadingCtrl: LoadingController, 
		public alertCtrl: AlertController, 
		public authProvider: AuthProvider, 
		public formBuilder: FormBuilder,
		public userDataProvider : UserDataProvider) {
	    this.loginForm = formBuilder.group({
	      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
	      password: ['', Validators.compose([Validators.minLength(6),Validators.required])]
	    });
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad LoginPage');
	}

	loginUser(): void {
	  if (!this.loginForm.valid){
	    console.log(this.loginForm.value);
	  } else {
	    this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password)
	    .then( authData => {
	      this.loading.dismiss().then( () => {
	      	this.userDataProvider.login(authData.displayName? authData.displayName : authData.email);
	        this.navCtrl.setRoot(HomePage);
	      });
	    }, error => {
	      this.loading.dismiss().then( () => {
	        let alert = this.alertCtrl.create({
	          message: error.message,
	          buttons: [
	            {
	              text: "Ok",
	              role: 'cancel'
	            }
	          ]
	        });
	        alert.present();
	      });
	    });
	    this.loading = this.loadingCtrl.create();
	    this.loading.present();
	  }
	}	

	goToSignup(): void { this.navCtrl.push('sign-up'); }

	goToResetPassword(): void { this.navCtrl.push('reset-password'); }

}
