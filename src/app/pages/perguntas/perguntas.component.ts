import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
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
  inscricao: Subscription;
  perguntas: Perguntas[];
  itemColor: string = null;
  itemIcon: string = null;
  itensDesabilitados: boolean;
  selectedItem: any;
  perguntaAtualIndex: number = 0;
  perguntaAtual: Perguntas;
  disciplinaSelecionada: string;

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
    protected route: ActivatedRoute,
    protected router: Router,
    private service: PerguntasService) {
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let navParams = this.router.getCurrentNavigation().extras.state;
      if (!navParams) return;

      this.disciplinaSelecionada = navParams.disciplina;
    });

    this.inscricao = await this.service.obterTodas().subscribe(
      response => this.carregarPerguntas(response),
      error => console.log(error)
    );

    this.mostrarPergunta();
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

  private mostrarPergunta() {
    this.perguntaAtual = this.perguntas[this.perguntaAtualIndex];
  }

  private carregarPerguntas(response: Perguntas[]) {
    if (this.disciplinaSelecionada) {
      response = response.filter(o => o.disciplina == this.disciplinaSelecionada);
    }

    this.embaralharPerguntas(response);

    this.perguntas = response || [];
  }

  private embaralharPerguntas(perguntas) {
    let indexAtual = perguntas.length, indexAleatorio;

    while (indexAtual != 0) {
      indexAleatorio = Math.floor(Math.random() * indexAtual);
      indexAtual--;

      [perguntas[indexAtual], perguntas[indexAleatorio]] = [perguntas[indexAleatorio], perguntas[indexAtual]];
    }

    return perguntas;
  }

  private proximaPergunta() {
    this.resetarEstado();
    this.perguntaAtualIndex++;

    this.perguntaAtualIndex < this.perguntas.length ? this.mostrarPergunta() : this.proximaEtapa();
  }

  private proximaEtapa() {
    this.itensDesabilitados = true;
    this.respostasPontuacao = (this.respostasCorretas / this.perguntas.length * 100).toFixed(2);

    const params: NavigationExtras = {
      state: [
        {data: 'quantidadePerguntas', value: this.perguntas.length},
        {data: 'respostasCorretas', value: this.respostasCorretas},
        {data: 'pontuacaoRespostas', value: this.respostasPontuacao},
        {data: 'disciplina', value: this.disciplinaSelecionada}
      ]
    };

    this.resetarEstado();
    this.nav.navigateForward('pontuacao', params)
  }

  private resetarEstado() {
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