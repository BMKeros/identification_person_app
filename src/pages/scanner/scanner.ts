import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { NativeAudio } from '@ionic-native/native-audio';
import { PersonServiceProvider } from '../../providers/person-service/person-service';

@IonicPage()
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScannerPage {

  private readyCamera: boolean;
  private panel: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private qrScanner: QRScanner,
    private nativeAudio: NativeAudio,
    private toastCtrl: ToastController,
    private personService: PersonServiceProvider,
    ) {
      this.readyCamera = false;
      this.panel = 'welcome';

      this.nativeAudio.preloadSimple('sound_found', 'assets/sounds/found.mp3').then(() => {
        console.log("ready sound");
      }, () => console.log("error"));
  }

  ionViewWillEnter() {
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.readyCamera = true;
      } else if (status.denied) {
        this.qrScanner.openSettings();
      } else {
        this.readyCamera = false;
      }
    }).catch((e: any) => console.log('Error is', e));
  }
  
  initScanner() {
    this.panel = 'scanner';
    if(this.readyCamera){
        this.showCamera();
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {

        this.nativeAudio.play('sound_found').then(console.log, console.log);

        const p = this.personService.findPerson(text);
        localStorage.setItem('current_person', JSON.stringify(p));
        
        this.qrScanner.hide(); // hide camera preview
        scanSub.unsubscribe(); // stop scanning
        this.hideCamera();
        this.panel = 'welcome';

        setTimeout(() => {
          this.navCtrl.setRoot('DetailPage');
        }, 200);
      });

      this.qrScanner.show();
    }
  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }
  
  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

  ionViewWillLeave(){
    this.hideCamera();
    this.panel = 'welcome';
  }

  showMessageToast(message) {
    const toast = this.toastCtrl.create({
      message: message,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Close'
    });
    
    toast.present();
  }

}
