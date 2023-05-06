import {Component} from '@angular/core';
import {IonicModule, NavController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  standalone: true,
  imports: [IonicModule],
})

export class HomeComponent {
  variavelLinda: string;

  constructor(
    protected nav: NavController
  ) {}

  async onClickProsseguir() {
    await this.nav.navigateForward('perguntas');
  }

}
