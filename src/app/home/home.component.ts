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
  darkMode: boolean = false;

  public get switchButtonTheme(): string {
    return this.darkMode ? 'sunny-outline' : 'moon-outline'
  }

  constructor(
    protected nav: NavController
  ) {}

  async onClickIniciarQuiz() {
    await this.nav.navigateForward('perguntas');
  }

  onClickMudarTema() {
    this.darkMode = !this.darkMode
  }
}
