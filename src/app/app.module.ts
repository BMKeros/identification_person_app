import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';

import { RegistrationPage } from '../pages/registration/registration';
import { ScannerPage } from '../pages/scanner/scanner';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';

import { QRScanner } from '@ionic-native/qr-scanner';
import { Dialogs } from '@ionic-native/dialogs';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { NativeAudio } from '@ionic-native/native-audio';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Diagnostic } from '@ionic-native/diagnostic';



import { PersonServiceProvider } from '../providers/person-service/person-service';

@NgModule({
  declarations: [
    MyApp,
    RegistrationPage,
    ScannerPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegistrationPage,
    ScannerPage,
    HomePage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QRScanner,
    PersonServiceProvider,
    NativeAudio,
    Dialogs,
    FileTransfer,
    File,
    Diagnostic
  ]
})
export class AppModule {}
