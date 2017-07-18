import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController,  NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IdeaValidator } from '../../validators/idea';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { ReferenceDataProvider } from '../../providers/reference-data/reference-data';
import { IdeaListingProvider } from '../../providers/idea-listing/idea-listing';
/**
 * Generated class for the CreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
	name:"create"
})
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

	public ideaCreateForm:FormGroup;
	public loading:Loading;
	public ideaStages : Array<string>;
	public catagories : Array<string>;
	public ideaNeeds : Array<string>;
	constructor(
		public navCtrl: NavController, 
		public loadingCtrl: LoadingController, 
		public alertCtrl: AlertController, 
		public authProvider: AuthProvider, 
		public formBuilder: FormBuilder,
		public userDataProvider : UserDataProvider,
		public referenceDataProvider: ReferenceDataProvider,
		public ideaProvider: IdeaListingProvider,) {
	    this.ideaCreateForm = formBuilder.group({
	      title: ['', Validators.compose([Validators.required, Validators.maxLength(100), IdeaValidator.isValidText])],
	      description: ['', Validators.compose([Validators.required, Validators.maxLength(4000),IdeaValidator.isValidText])],
	      stage:['', Validators.compose([Validators.required])],
	      category:['', Validators.compose([Validators.required])],
	      ideaNeeds:['', Validators.compose([Validators.required])],
	      remarks: ['', Validators.compose([Validators.required, Validators.maxLength(4000),IdeaValidator.isValidText])],
	    });
	}

	ionViewDidLoad() {
		this.ideaStages = [
			"I just thought about it",
			"Idea is liked by my family and friends",
			"I have done good research",
			"I know top three competitors",
			"I have done Pre Screening of my idea",
			"Concept testing is done",
			"Business Analytics is completed",
			"Beta / Markatability tests completed",
			"Technicalities are understood",
			"I have commercialization plan",
			"My idea is launched in limited scale",
			"I have done post launch review"
		];
		this.referenceDataProvider.getCategories().then( data => {
			this.catagories = data;
			//console.log(data);
		});
		this.ideaNeeds = [
			"Validation",
			"Investment",
			"Service Providers",
			"Testers",
			"Mentor",
			"Consultants",
			"Others"
		];
	}

	loginUser(): void {
	  if (!this.ideaCreateForm.valid){
	    console.log(this.ideaCreateForm.value);
	  } else {
	    console.log("error");
	  }
	}	

	createIdea(){
		if (!this.ideaCreateForm.valid){
			console.log(this.ideaCreateForm.value);
		} else {
			let summary = this.ideaCreateForm.value.title;
			let description = this.ideaCreateForm.value.description;
			let stage = this.ideaCreateForm.value.stage;
			let category = this.ideaCreateForm.value.category;
			let ideaNeeds = this.ideaCreateForm.value.ideaNeeds;
			let remarks = this.ideaCreateForm.value.remarks;
			this.ideaProvider.createIdea(summary,description,stage,category,ideaNeeds,remarks)
			.then( () => {
				this.loading.dismiss().then( () => {
        		this.navCtrl.setRoot("about");
			    });
    		}, (error) => {
      			this.loading.dismiss().then( () => {
        		let alert = this.alertCtrl.create({
          			message: error.message,
          			buttons: [
            			{
              				text: "Ok",
              				role: 'cancel'
            			}
          			]	
        		});
        		alert.present();
      			});
			});
	    	this.loading = this.loadingCtrl.create();
    		this.loading.present();	
    	}

	}
}
