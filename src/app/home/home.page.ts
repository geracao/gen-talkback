import {Component} from '@angular/core';
import {IonicModule} from '@ionic/angular';

import {ScreenReader} from '@capacitor/screen-reader';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})

export class HomePage {
  constructor() { }

  onClickTeste() {
    console.log("De fato, feito")
    ScreenReader.speak({value: 'Teste de som'});
  }
}
