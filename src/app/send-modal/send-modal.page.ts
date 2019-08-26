import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-send-modal',
  templateUrl: './send-modal.page.html',
  styleUrls: ['./send-modal.page.scss'],
})
export class SendModalPage implements OnInit {

  cipheredText: any;
  messageString: any;
  datePicked: any;

  constructor(public modalController: ModalController, public toastController: ToastController) {

   }

  ngOnInit() {
    //this.cipheredText = "Bottle Code"
  }

  dismiss(){
    this.modalController.dismiss();
  }

  cipher(){
    var combinedMessage = this.messageString + '/d' + this.datePicked
    console.log(combinedMessage)

    var aesjs = require('aes-js');
    var key = [ 48, 43, 32, 12, 43, 76, 23, 73, 2, 69, 54, 94, 62, 35, 74, 82 ];
    var textBytes = aesjs.utils.utf8.toBytes(this.messageString);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    console.log(encryptedHex);
    this.cipheredText = encryptedHex

  }

  async share(){
    this.cipher()
    //this.modalController.dismiss();
    
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
