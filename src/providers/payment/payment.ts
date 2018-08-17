import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the PaymentProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PaymentProvider {

  constructor() {
    console.log('Hello PaymentProvider Provider');
  }

  addPaymentInitialization(
    firstName: string,
    email: string,
    phone: string,
    amount: number,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let txnId = Math.random().toString(36).slice(2);
      let utcDate = new Date().toUTCString();
      firebase.database().ref('/payments')
        .child(firebase.auth().currentUser.uid)
        .push({
          firstName: firstName,
          email: email,
          phoneNumber:phone,
          amount: amount,
          transactionID: txnId,
          transactionDate: utcDate,
          status: 'Initiated'
        });
      resolve(txnId);  
    });
  }

}
