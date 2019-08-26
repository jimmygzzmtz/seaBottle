import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-send-modal',
  templateUrl: './send-modal.page.html',
  styleUrls: ['./send-modal.page.scss'],
})
export class SendModalPage implements OnInit {

  cipheredText: any;
  messageString: any;
  senderString: any;
  datePicked: any;

  constructor(public modalController: ModalController, public toastController: ToastController, public alertController: AlertController) {

   }

  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss();
  }

  cipher(){
    var combinedMessage = this.senderString + '/sp' + this.messageString + '/sp' + this.datePicked

    var aesjs = require('aes-js');
    var key = [ 48, 43, 32, 12, 43, 76, 23, 73, 2, 69, 54, 94, 62, 35, 74, 82 ];
    var textBytes = aesjs.utils.utf8.toBytes(combinedMessage);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    this.cipheredText = encryptedHex

  }

  async share(){

    if(this.cipheredText == "" || this.messageString == "" || this.senderString == "" || this.datePicked == undefined){
      const alert = await this.alertController.create({
        header: 'Incomplete Bottle',
        message: 'Please fill in all the fields in the message.',
        buttons: ['OK']
      });

      await alert.present();

      return
    }

    let currentDate = new Date()
    if (currentDate >= new Date(this.datePicked)){
      const alert = await this.alertController.create({
        header: 'Incorrect Date',
        message: 'Please input a future date.',
        buttons: ['OK']
      });

      await alert.present();

      return
    }

    this.cipher()
    
    let newNavigator: any;
    newNavigator = window.navigator;

    if (newNavigator && newNavigator.share) {
      newNavigator.share({
        title: 'Sea Bottle',
        text: this.cipheredText,
        //url: final url of app,
      })
    } else {
      let listener = (e: ClipboardEvent) => {
        e.clipboardData.setData('text/plain', (this.cipheredText));
        e.preventDefault();
      };

      document.addEventListener('copy', listener);
      document.execCommand('copy');
      document.removeEventListener('copy', listener);

      const toast = await this.toastController.create({
        message: 'The Bottle Code has been copied.',
        duration: 2000
      });
      toast.present();
    }

  }

}
