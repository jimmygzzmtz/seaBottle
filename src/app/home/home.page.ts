import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SendModalPage } from '../send-modal/send-modal.page';
import { InventoryModalPage } from '../inventory-modal/inventory-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public modalController: ModalController) {

  }

  async sendBottle(){
    const modal = await this.modalController.create({
      component: SendModalPage,
      componentProps: { 
      },
      backdropDismiss: false
    });

    modal.onDidDismiss()
      .then(() => {
    });
    

    await modal.present(); 
  }

  async openInventory(){
    const modal = await this.modalController.create({
      component: InventoryModalPage,
      componentProps: { 
      },
      backdropDismiss: false
    });

    modal.onDidDismiss()
      .then(() => {
    });
    

    await modal.present(); 
  }

}
