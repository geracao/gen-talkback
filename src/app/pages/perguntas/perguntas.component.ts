import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationExtras} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, NavController} from '@ionic/angular';
import {Subscription} from 'rxjs';

import {IAlternativa, Perguntas} from '../../interfaces/perguntas';
import {PerguntasService} from '../../services/perguntas.service';

@Component({
  selector: 'app-perguntas',
  templateUrl: './perguntas.component.html',
  styleUrls: ['./perguntas.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PerguntasComponent implements OnInit, OnDestroy {
  inscricao: Subscription;;
  perguntas: Perguntas[];
  itemColor: string = null;
  itemIcon: string = null;
  itensDesabilitados: boolean;
  selectedItem: any;
  perguntaAtualIndex: number = 0;
  perguntaAtual: Perguntas;

  respostasCorretas: number = 0;
  respostasPontuacao: string;

  public getItemColor(item): any {
    return this.selectedItem === item ? this.itemColor : null;
  }

  public getIcon(item): any {
    return this.selectedItem === item ? this.itemIcon : null;
  }

  constructor(
    protected nav: NavController,
    private service: PerguntasService) {
  }

  async ngOnInit() {
    this.inscricao = await this.service.obterTodas().subscribe(
      response => this.carregarPerguntas(response),
      error => console.log(error)
    );

    this.mostrarPergunta();
  }

  mostrarPergunta() {
    this.perguntaAtual = this.perguntas[this.perguntaAtualIndex];
  }

  carregarPerguntas(response: Perguntas[]) {
    this.perguntas = response || [];
  }

  onClickAlternativa(evento: IAlternativa) {
    this.selectedItem = evento;
    this.itensDesabilitados = true;

    if (evento.resposta) {
      this.itemColor = "success";
      this.itemIcon = "checkmark-outline";
      this.respostasCorretas++;
    } else {
      this.itemColor = "danger";
      this.itemIcon = "close-outline";
    }

    if (this.perguntaAtualIndex === this.perguntas.length) {
      return;
    }

    setTimeout(() => {
      this.proximaPergunta();
    }, 500);

  }

  proximaPergunta() {
    this.resetarEstado();
    this.perguntaAtualIndex++;

    if (this.perguntaAtualIndex < this.perguntas.length) {
      this.mostrarPergunta();
    }
    else {
      this.itensDesabilitados = true;
      this.respostasPontuacao = (this.respostasCorretas / this.perguntas.length * 100).toFixed(2);

      const params: NavigationExtras = {
        state: [
          {data: 'quantidadePerguntas', value: this.perguntas.length},
          {data: 'respostasCorretas', value: this.respostasCorretas},
          {data: 'pontuacaoRespostas', value: this.respostasPontuacao}
        ]
      };

      this.nav.navigateForward('perguntas/pontuacao', params)
    }

  }

  resetarEstado() {
    this.itensDesabilitados = false;
    this.itemColor = null;
    this.itemIcon = null;
  }

  ngOnDestroy(): void {
    if (this.inscricao) {
      this.inscricao.unsubscribe();
    }
  }
}