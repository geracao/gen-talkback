import {Component} from '@angular/core';
import {NavigationExtras} from '@angular/router';
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

  constructor(protected nav: NavController) { }

  async onClickIniciarQuiz(disciplina?: string) {
    let navigationExtras: NavigationExtras = {
      state: {
        disciplina: disciplina
      }
    };

    await this.nav.navigateForward(['perguntas'], navigationExtras);
  }

  onClickMudarTema() {
    this.darkMode = !this.darkMode
  }
}
