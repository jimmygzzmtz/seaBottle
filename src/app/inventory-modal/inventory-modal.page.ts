import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-inventory-modal',
  templateUrl: './inventory-modal.page.html',
  styleUrls: ['./inventory-modal.page.scss'],
})
export class InventoryModalPage implements OnInit {
  bottles: any = [];

  constructor(public modalController: ModalController, public alertController: AlertController, private storage: Storage) { 

    this.storage.get('bottlesArr').then((val) => {
      if (val != "[]"){
       this.bottles = JSON.parse(val)
      }
      else{
       this.storage.set('bottlesArr', JSON.stringify(this.bottles));
      }
    });

  }

  getBottles() {
    if (this.bottles != undefined){
 
     var bottles2 = this.bottles;
     bottles2.sort((a: any, b: any) => {
        var aDate = new Date(a.date.valueOf());
        var bDate = new Date(b.date.valueOf());
        return aDate.getTime() - bDate.getTime();
      }); 
      return bottles2;
 
      } 
  }


  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss();
  }

  decipher(encryptedHex){
    var aesjs = require('aes-js');
    var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
    var key = [ 48, 43, 32, 12, 43, 76, 23, 73, 2, 69, 54, 94, 62, 35, 74, 82 ];
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText
  }

  async unlockBottle(bottle) {

    let index = this.bottles.indexOf(bottle);
    
    let currentDate = new Date()

    if (currentDate >= bottle.date){
      const alert = await this.alertController.create({
        header: 'Bottle',
        subHeader: 'From: ' + this.bottles[index].sender,
        message: this.bottles[index].message,
        buttons: ['OK']
      });
  
      await alert.present();
  
      if(index > -1){
          this.bottles.splice(index, 1);
          this.storage.set('bottlesArr', JSON.stringify(this.bottles));
      }
    }
    else{
      const alert = await this.alertController.create({
        header: 'Not yet!',
        message: 'This bottle has not arrived yet. Please wait until the unlock time',
        buttons: ['OK']
      });

      await alert.present();
    }

    

  }
  
  async addBottle(){

    const alert = await this.alertController.create({
      header: 'Add Bottle',
      inputs: [
        {
          name: 'cipheredText',
          type: 'text',
          placeholder: 'Bottle Code'
        }
      ],
      buttons: [
        {
            text: 'Cancel'
        },
        {
            text: 'Add',
            handler: data => {
                if(data.cipheredText != ""){
                  var decryptedText = this.decipher(data.cipheredText)
                  var splitted = decryptedText.split("/sp");
                  if (this.bottles == null){
                    this.bottles = [];
                    this.bottles.push({
                      sender: splitted[0],
                      message: splitted[1],
                      date: new Date(splitted[2])
                    })
                  }
                  else{
                    this.bottles.push({
                      sender: splitted[0],
                      message: splitted[1],
                      date: new Date(splitted[2])
                    })
                  }
                  this.storage.set('bottlesArr', JSON.stringify(this.bottles));

                }
                else{
                  return false;
                }
            }
            
        }
    ]
    });

    await alert.present();

  }

}
