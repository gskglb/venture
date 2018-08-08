import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfileProvider {

  public profileImage: any; 	

  constructor() {
    console.log('Hello ProfileProvider Provider');
  }

	getUserProfile(): Promise<any> {
	  return new Promise( (resolve, reject) => {
	    firebase.database().ref('/userProfile')
	    .child(firebase.auth().currentUser.uid)
	    .on('value', data => {
	      resolve(data.val());
	    });
	  });
	}

	updateName(firstName: string, lastName: string): Promise<any> {
	  return firebase.database().ref('/userProfile')
	  .child(firebase.auth().currentUser.uid).update({
	    firstName: firstName,
	    lastName: lastName,
	  });
	}	

	updateDOB(birthDate: string): Promise<any> {
	  return firebase.database().ref('/userProfile')
	  .child(firebase.auth().currentUser.uid).update({
	    birthDate: birthDate,
	  });
	}

	updateEmail(newEmail: string, password: string): Promise<any> {
	    const credential =  firebase.auth.EmailAuthProvider
	        .credential(firebase.auth().currentUser.email, password);

	  return firebase.auth().currentUser.reauthenticateWithCredential(credential)
	  .then( user => {
	    firebase.auth().currentUser.updateEmail(newEmail).then( user => {
	        firebase.database().ref('/userProfile')
	        .child(firebase.auth().currentUser.uid).update({ email: newEmail });
	    });
	  });
	}

	updatePassword(newPass: string, oldPassword: string): Promise<any> {
	    const credential =  firebase.auth.EmailAuthProvider
	        .credential(firebase.auth().currentUser.email, oldPassword);

	    return firebase.auth().currentUser.reauthenticateWithCredential(credential)
	    .then( user => {
	        firebase.auth().currentUser.updatePassword(newPass).then( user => {
	            console.log("Password Changed");
	        }, error => {
	      console.log(error);
	    });
	  });
	}

	 takePicture(){

	}


  updateProfileImage(imageData): Promise<any> {
   let userId = firebase.auth().currentUser.uid;
   return firebase.storage().ref('/profileImages/').child(userId).child('profilePicture.png')
   	.putString(imageData, 'base64', {contentType: 'image/png'})
   	.then((savedPicture) => {
   		firebase.database().ref('userProfile').child(firebase.auth().currentUser.uid)
   		.update({profileURL : savedPicture.downloadURL});
   	})
  }

}
