import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailPage } from './detail';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    DetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailPage),
    NgxQRCodeModule
  ],
})
export class DetailPageModule {}
