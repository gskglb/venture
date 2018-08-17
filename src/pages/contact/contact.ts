import { ChangeDetectorRef, Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, AlertController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserObject, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IdeaValidator } from '../../validators/idea';
import { EmailValidator } from '../../validators/email';
import { PaymentProvider } from '../../providers/payment/payment';
//import {SHA512} from 'crypto-js';
import { sha512 } from 'js-sha512';

@IonicPage({
  name: "contact"
})
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public paymentForm: FormGroup;
  public loading: Loading;
  private log : string[];
  private browser: InAppBrowserObject;

  curl = "cancel.html";
  surl = "success.html";
  furl = "failure.html";
  key = "0iwyFROJ";
  hash = "";
  txnid = "123456";
  productinfo = "TestProduct";
  service_provider = "payu_paisa";
  salt = "yLPh1Vwd9V";

  constructor(
    private cdRef: ChangeDetectorRef,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private iab: InAppBrowser,
    public formBuilder: FormBuilder,
    private payment: PaymentProvider) {
    this.paymentForm = formBuilder.group({
      firstName: ['guru', Validators.compose([Validators.required, Validators.maxLength(25), IdeaValidator.isValidText])],
      email: ['guru4raj@gmail.com', Validators.compose([Validators.required, EmailValidator.isValid])],
      phone: ['9704038269', Validators.compose([Validators.required])],
      amount: ['200.00', Validators.compose([Validators.required])]
    });
    this.txnid = "123456";
    this.log = [];
  }

  async completePayment() {

    this.pushLog("Payment process initiated....");

    let firstName = this.paymentForm.value.firstName;
    let email = this.paymentForm.value.email;
    let phone = this.paymentForm.value.phone;
    let amount = parseFloat(this.paymentForm.value.amount);
    let udf1 = "";
    let udf2 = "";
    let udf3 = "";
    let udf4 = "";
    let udf5 = "";

    // Add initial entry that payment is initialized
    let txnID = '12345';
    try {
      //txnID = await this.payment.addPaymentInitialization(firstName, email, phone, amount)
      this.txnid = txnID;
      let hashSequence = `${this.key}|${this.txnid}|${amount}|${this.productinfo}|${firstName}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${this.salt}`
      this.hash = sha512(hashSequence);

      //this.loading.dismiss();
      // Start preparing payumoney integration
      let paymentString = `
            <input type="hidden" name="firstname" value="${firstName}"/>
            <input type="hidden" name="email" value="${email}"/>
            <input type="hidden" name="phone" value="${phone}"/>
            <input type="hidden" name="surl" value="${this.surl}"/>
            <input type="hidden" name="curl" value="${this.curl}"/>
            <input type="hidden" name="furl" value="${this.furl}"/>
            <input type="hidden" name="key" value="${this.key}"/>
            <input type="hidden" name="hash" value="${this.hash}"/>
            <input type="hidden" name="txnid" value="${this.txnid}"/>
            <input type="hidden" name="productinfo" value="${this.productinfo}"/>
            <input type="hidden" name="amount" value="${amount}"/>
            <input type="hidden" name="service_provider" value="${this.service_provider}"/>
          `;

      let payScript = "var form = document.getElementById('ts-app-payment-form-redirect');"
      payScript += "form.innerHTML = `" + paymentString + "`;";

      let post_url = "https://sandboxsecure.payu.in/_payment";
      payScript += "form.action = '" + post_url + "';";
      payScript += "form.method = 'POST';";
      payScript += "form.submit();" ;
      console.log(payScript);
      //      paymentString = 'data:text/html;base64,' + btoa(paymentString);

      this.browser = this.iab.create('pay.html',"_blank", {
      });

      this.browser.on('loadstart').subscribe((event: InAppBrowserEvent) => {
        this.pushLog("loadstart -->");
        if (event.url === this.surl) {
          this.pushLog("Success");
          this.browser.close();
          this.paymentSuccess();
        } else if (event.url === this.furl) {
          this.pushLog("Failure");
          this.browser.close();
          this.paymentFailure();
        } 
      });

      this.browser.on('loadstop').subscribe((event: InAppBrowserEvent) => {
        this.pushLog("loadstop -->");
        this.pushLog(payScript);
        this.browser.executeScript({
          code : payScript
        });
        this.pushLog("script executed");
      }, (error) => {
        console.log("loadstop --> error" + error);
      } 
      );


    } catch (error) {
      //this.loading.dismiss().then( () => {
        this.pushLog("error orrcured" + error);
      let alert = this.alertCtrl.create({
        message: "We have encountered technical issue. Please try again later",
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });
      alert.present();
      // });      
    }
    // this.loading = this.loadingCtrl.create();
    // this.loading.present();

  }

  paymentSuccess() {
    console.log("Payment is successful");
  }

  paymentFailure() {
    console.log("Payment is failure");
  }

  paymentCancelled() {
    console.log("Payment is cancelled");
  }

  update(){
    console.log(this.log);
  }

  pushLog(str: string): void {
    this.log.push(str);
    this.cdRef.detectChanges();
  }
}
