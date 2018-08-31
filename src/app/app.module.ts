import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FirstTimePage }from '../pages/first-time/first-time';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { UserDataProvider } from '../providers/user-data/user-data';
import { ProfileProvider } from '../providers/profile/profile';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { IdeaListingProvider } from '../providers/idea-listing/idea-listing';

import { SocialSharing } from '@ionic-native/social-sharing';
import { ReferenceDataProvider } from '../providers/reference-data/reference-data';
import { PaymentProvider } from '../providers/payment/payment';


export class CameraMock extends Camera {
// getPicture(options){
//   return new Promise( (resolve, reject) => {
//     resolve(`TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1
//     bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgY
//     SBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb2
//     4gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=`);
//   });
// }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    FirstTimePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    FirstTimePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {provide: Camera, useClass: CameraMock},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UserDataProvider,
    ProfileProvider,
    IdeaListingProvider,
    SocialSharing,
    ReferenceDataProvider,
    PaymentProvider,
  ]
})
export class AppModule {}
