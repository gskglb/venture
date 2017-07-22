import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageIdeaPage } from './manage-idea';

@NgModule({
  declarations: [
    ManageIdeaPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageIdeaPage),
  ],
  exports: [
    ManageIdeaPage
  ]
})
export class ManageIdeaPageModule {}
