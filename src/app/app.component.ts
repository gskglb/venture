import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import  firebase  from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    
    firebase.initializeApp({
        apiKey: "AIzaSyAWcOuQ4iNnPH0fjiGkVgHqr76vekhgh_8",
        authDomain: "venture-b9a3e.firebaseapp.com",
        databaseURL: "https://venture-b9a3e.firebaseio.com",
        projectId: "venture-b9a3e",
        storageBucket: "venture-b9a3e.appspot.com",
        messagingSenderId: "651410299407"
    }); 

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });
  }
}
