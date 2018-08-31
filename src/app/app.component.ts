import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { FirstTimePage } from '../pages/first-time/first-time';
import { Storage } from '@ionic/storage';
import  firebase  from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(
    private platform: Platform, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen,
    private storage: Storage) {
    
    firebase.initializeApp({
      apiKey: "AIzaSyCVdX0iNCBUUd08SQLJmCrWcgjKuo__q_s",
      authDomain: "demoapp-gsk.firebaseapp.com",
      databaseURL: "https://demoapp-gsk.firebaseio.com",
      projectId: "demoapp-gsk",
      storageBucket: "demoapp-gsk.appspot.com",
      messagingSenderId: "708274529807"
    }); 

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      console.log('reading');
      this.storage.get('phone').then((val) => {
        console.log(val);
        if (val === null){
          this.rootPage = FirstTimePage
          //this.storage.set('phone', '9704038269');

        } else {
          this.rootPage = TabsPage
        }
        
      });      
    });
  }
}
