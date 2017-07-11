import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { Camera } from '@ionic-native/camera';
import { HomePage } from '../home/home';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'profile'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  zone: NgZone;
  public userProfile: any;
  public birthDate: string;
  public avatar: string;
  public headerImage: "https://dummyimage.com/600x400/000/fff";


  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public profileProvider: ProfileProvider, 
    public authProvider: AuthProvider, 
    public cameraPlugin: Camera,
    public userDataProvider: UserDataProvider) {
    this.zone = new NgZone({});
  }

  ionViewWillEnter() {
    this.profileProvider.getUserProfile().then( profileSnap => {
      this.userProfile = profileSnap;
      this.zone.run(() => {
        this.avatar = this.userProfile.profileURL;
      });
      console.log(this.userProfile);
      //this.birthDate = this.userProfile.birthDate;
    });    
  }



  logOut(){
    this.authProvider.logoutUser().then(() => {
      this.userDataProvider.logout();
      this.navCtrl.setRoot(HomePage);
    });
  }

  editImage(){
      this.cameraPlugin.getPicture({
      quality : 95,
      destinationType : this.cameraPlugin.DestinationType.DATA_URL,
      sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: this.cameraPlugin.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }).then(imageData => {
      this.profileProvider.updateProfileImage(imageData);
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  editName(){
    let alert = this.alertCtrl.create({
      message: "Your first name & last name",
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.userProfile.firstName
        },
        {
          name: 'lastName',
          placeholder: 'Your last name',
          value: this.userProfile.lastName
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }  

  updateDOB(birthDate){
    this.profileProvider.updateDOB(birthDate);
  }

  updateEmail(){
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newEmail',
          placeholder: 'Your new email',
        },
        {
          name: 'password',
          placeholder: 'Your password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider.updateEmail(data.newEmail, data.password);
          }
        }
      ]
    });
    alert.present();
  }

  updatePassword(){
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newPassword',
          placeholder: 'Your new password',
          type: 'password'
        },
        {
          name: 'oldPassword',
          placeholder: 'Your old password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider.updatePassword(data.newPassword, data.oldPassword);
          }
        }
      ]
    });
    alert.present();
  }  


}