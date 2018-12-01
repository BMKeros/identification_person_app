import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Person } from '../../interfaces/person';
import { PersonServiceProvider } from '../../providers/person-service/person-service';
import { Dialogs } from '@ionic-native/dialogs';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Diagnostic } from '@ionic-native/diagnostic';


@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  
  showForm: boolean = true;
  form: Person = {code: '', name: '', lastName: '', cc: '', surgery: '', accident: '', gender: '', rh: '', contact_name: '', contact_number: ''};
  static readonly KEY_STORAGE = 'persons';
  qrCodeUrl: string = '';
  currentCode: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private personService: PersonServiceProvider,
    private dialogs: Dialogs,
    private toastCtrl: ToastController,
    private transfer: FileTransfer,
    private file:File,
    private diagnostic: Diagnostic) {
  }

  ionViewWillEnter() {
    this.dialogs.prompt('Introduzca la constraseña', 'Restringido').then((res)=>{
      if(res.input1 != 'admin'){
        const toast = this.toastCtrl.create({
          message: 'Credenciales invalidas',
          duration: 3000
        });

        toast.present();

        this.navCtrl.parent.select(0);
      }
    });
  }
  
  saveForm(){
    this.form.code = this.generateHash();
    this.personService.addPerson(this.form);
    this.currentCode = this.form.code;
    this.form = {code: '', name: '', lastName: '', cc: '', surgery: '', accident: '', gender: '', rh: '', contact_name: '', contact_number: ''};
    this.showForm = false;
  }

  closeQR() {
    this.showForm = true;
  }

  donwloadQR() {
    let srcQR = document.getElementsByClassName('box-qr')[0].getElementsByTagName('img')[0].getAttribute('src');

    this.diagnostic.requestExternalStorageAuthorization().then((result) => {

      if(result == this.diagnostic.permissionStatus.GRANTED){
        const fileTransfer = this.transfer.create();

        fileTransfer.download(srcQR, this.file.externalRootDirectory + 'qrimages/' +this.currentCode + '_QR.png').then((entry) => {
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

  private generateHash(): string {
    return Math.random().toString(36).substring(2, 15).toUpperCase() + Math.random().toString(36).substring(2, 15).toUpperCase();
  }

}
