import {Component} from '@angular/core';
import {IonicModule, NavController} from '@ionic/angular';

import {ScreenReader} from '@capacitor/screen-reader';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})

export class HomePage {
  constructor(
    protected nav: NavController
  ) {

  }

  public get Prosseguir() : string {
    return 'Clique para jogar'
  }
  
  async onClickProsseguir(){
    ScreenReader.speak({value: 'navegando até a tela de perguntas'})
    
    setTimeout(() => {
      this.nav.navigateForward('perguntas');
    }, 1000);
  }
}
