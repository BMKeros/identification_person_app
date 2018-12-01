import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrationPage } from './registration';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    RegistrationPage,
    NgxQRCodeModule,
  ],
  imports: [
    IonicPageModule.forChild(RegistrationPage),
  ],
})
export class RegistrationPageModule {}
