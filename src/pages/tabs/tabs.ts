import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { RegistrationPage } from '../registration/registration';
import { ScannerPage } from '../scanner/scanner';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ScannerPage;
  tab2Root = RegistrationPage;
  tab3Root = HomePage;

  constructor() {

  }
}
