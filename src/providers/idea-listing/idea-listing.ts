import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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

}
