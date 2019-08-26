import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SendModalPage } from '../send-modal/send-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public modalController: ModalController) {

  }

  async sendBottle(){
    console.log("send bottle test")

    const modal = await this.modalController.create({
      component: SendModalPage,
      componentProps: { 
      },
      backdropDismiss: false
    });

    modal.onDidDismiss()
      .then(() => {
        //this.loadStudentDetails()
    });
    

    await modal.present(); 
  }

}
