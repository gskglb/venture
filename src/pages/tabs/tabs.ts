import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
@IonicPage({
	name:"tabs"
})
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = "listing";
  tab2Root = 'about';
  tab3Root = 'contact';

  constructor() {

  }
}
