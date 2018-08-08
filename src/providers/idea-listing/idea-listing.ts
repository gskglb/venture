import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
/*
  Generated class for the IdeaListingProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class IdeaListingProvider {

  constructor(public http: Http) {
    
  }

  getFreshIdeas(){
    return new Promise(resolve => {
        this.http.get('assets/freshdata.json').subscribe(res => resolve(res.json()));
    });
  }  

  getMyIdeas(){
    return new Promise( (resolve, reject) => {
      let ref = firebase.database().ref('/ideas');
      ref.orderByChild("createdBy").equalTo(firebase.auth().currentUser.uid).on("value", snapshot => {
        let rawList = [];
        snapshot.forEach( snap => {
          rawList.push({
            id: snap.key,
            summary:snap.val().summary,
            description:snap.val().description,

          });
        return false
        });
        resolve(rawList);
      });
    });
  }  

  createIdea(
    summary:string,
    description:string,
    stage: Array<string>, 
    category: Array<string>,
    ideaNeeds: Array<string>,
    remarks: string) : Promise<any> {
      let createdBy:string = firebase.auth().currentUser.uid;
      let status:string = "unpublished";
      let createdAt = firebase.database.ServerValue.TIMESTAMP;    
      return new Promise((resolve, reject) => {
        let newRef = firebase.database().ref('/').child('ideas').push({
          summary,description,stage,category,ideaNeeds,remarks,createdBy,status,createdAt
        });
        if(newRef){
          resolve(newRef);
        }else{
          reject("Write Failed");
        }
      });

  }


}
