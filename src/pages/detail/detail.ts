import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Person } from '../../interfaces/person';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Diagnostic } from '@ionic-native/diagnostic';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  currentPerson: Person;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private transfer: FileTransfer,
    private file:File,
    private diagnostic: Diagnostic
    ) {

      this.currentPerson = {code: '', name: '', lastName: '', cc: '', surgery: '', accident: '', gender: '', rh: '', contact_name: '', contact_number: ''};
  }

  ionViewWillEnter() {
    this.currentPerson = JSON.parse(localStorage.getItem('current_person'));
  }
  
  getSurgery(code) {
    const diseases= [
      {code:"c1", title:"Asma"},
      {code:"c2", title:"Diabetes"},
      {code:"c3", title:"Tensión Arterial"},
      {code:"c4", title:"Epilepsia"},
      {code:"c5", title:"No Aplica"},
    ];

    let index = diseases.findIndex(obj => obj.code == code);

    return index != -1 ? diseases[index].title : 'No Especificado';
  }

  getAccident(code) {
    const accidents = [
      {code: "a1", title: "Caídas a nivel"},
      {code: "a2", title: "Caídas de altura"},
      {code: "a3", title: "Lesión Osteomuscular"},
      {code: "a4", title: "Fracturas"},
      {code: "a5", title: "No aplica"},
    ];
    let index = accidents.findIndex(obj => obj.code == code);

    return index != -1 ? accidents[index].title : 'No Especificado';
  }

  goBack() {
    this.navCtrl.parent.select(2);
  }

  donwloadQR() {
    let srcQR = document.getElementsByClassName('box-qr')[0].getElementsByTagName('img')[0].getAttribute('src');

    this.diagnostic.requestExternalStorageAuthorization().then((result) => {

      if(result == this.diagnostic.permissionStatus.GRANTED){
        const fileTransfer = this.transfer.create();

        fileTransfer.download(srcQR, this.file.externalRootDirectory + 'qrimages/' +this.currentPerson.code + '_QR.png').then((entry) => {
          const toast = this.toastCtrl.create({
            message: 'QR guardado en ' + entry.toURL(),
            duration: 3000
          });

          toast.present();
        }, (error) => {
          const toast = this.toastCtrl.create({
            message: error,
            duration: 3000
          });

          toast.present();
        });
      }
    });
  }

}
