import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the ReferenceDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ReferenceDataProvider {

	constructor() {
		console.log('Hello ReferenceDataProvider Provider');
	}

	getCategories(): Promise<any> {
	  return new Promise( (resolve, reject) => {
	    firebase.database().ref('refData').child('/categories')
	    .on('value', data => {
	      resolve(data.val());
	    });
	  });
	}

}
