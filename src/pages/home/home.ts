import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Person } from '../../interfaces/person';
import { PersonServiceProvider } from '../../providers/person-service/person-service';
import { Dialogs } from '@ionic-native/dialogs';
import { ScannerPage } from '../../pages/scanner/scanner';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private persons: Person[] = [];

  constructor(
    public navCtrl: NavController, 
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private personService: PersonServiceProvider,
    private dialogs: Dialogs) {
  }

  ionViewWillLoad(){}

  ionViewWillEnter() {
    this.dialogs.prompt('Introduzca la constraseña', 'Restringido').then((res)=>{
      if(res.input1 == 'admin'){
        this.persons = this.personService.getPersons();
      } else {
        const toast = this.toastCtrl.create({
          message: 'Credenciales invalidas',
          duration: 3000
        });

        toast.present();

        this.navCtrl.parent.select(0);
      }
    });
  }

  showPerson(code){
    const p = this.personService.findPerson(code);
    if(p) {
      localStorage.setItem('current_person', JSON.stringify(p));
      this.navCtrl.setRoot('DetailPage');
    }
  }

}
