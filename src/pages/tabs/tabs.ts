import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { IonicPage } from 'ionic-angular';
@IonicPage({
	name:"tabs"
})
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = "listing";
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
