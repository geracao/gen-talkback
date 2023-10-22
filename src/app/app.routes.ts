import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'perguntas',
    loadComponent: () => import('./pages/perguntas/perguntas.component').then(m => m.PerguntasComponent)
  },
  {
    path: 'pontuacao',
    loadComponent: () => import('./pages/pontuacao/pontuacao.component').then(m => m.PontuacaoComponent)
  }
];
