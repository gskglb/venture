import { FormControl } from '@angular/forms';

export class IdeaValidator {

  static isValidText(control: FormControl){
    const re = /^\w/.test(control.value);
    if (re){ return null; }
    return { "invalidText": true };
  }
}