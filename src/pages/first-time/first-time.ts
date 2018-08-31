import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import firebase from 'firebase';
import {Firebase} from '@ionic-native/firebase';

/**
 * Generated class for the FirstTimePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-first-time',
  templateUrl: 'first-time.html',
})
export class FirstTimePage {

  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  public phoneLoginForm:FormGroup;
  public smssent: boolean = false; 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController) {
    this.phoneLoginForm = formBuilder.group({
      phoneNumber: [null, Validators.compose([Validators.required, Validators.minLength(12)])]
    });    
  }

  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',{
      'size': 'invisible',
      
    });
  }

  signIn(){
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = "+" + this.phoneLoginForm.value.phoneNumber;
    console.log("Sending SMS to " + phoneNumberString);
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then( confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        this.phoneLoginForm.controls['phoneNumber']['disable']();
        this.smssent = true;
        let prompt = this.alertCtrl.create({
          title: 'Enter the Confirmation code ',
          inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
          buttons: [
            { text: 'Cancel',
              handler: data => { console.log('Cancel clicked'); }
            },
            { text: 'Send',
              handler: data => {
                // Here we need to handle the confirmation code
                confirmationResult.confirm(data.confirmationCode)
                .then(function (result) {
                  // User signed in successfully.
                  console.log(result.user);
                  // ...
                }).catch(function (error) {
                  // User couldn't sign in (bad verification code?)
                  // ...
                });              
              }
            }
          ]
        });
        prompt.present();


    })
    .catch(function (error) {
      console.error("SMS not sent", error);
      //appVerifier.reset(window.recaptchaWidgetId);
    });
    console.log(window);
    // (<any>window).FirebasePlugin.verifyPhoneNumber(phoneNumberString, 60, (credential) =>{
    //   console.log(credential);
    //   var verificationId = credential.verificationId;
    //   console.info("Verification is successful");
    //   }, (error) =>{
    //     //this.eer = error;
    //     console.error(error);
    //   });


  }


}
