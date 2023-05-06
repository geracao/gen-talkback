import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {PerguntasService} from '../../services/perguntas.service';
import {Subscription} from 'rxjs';
import {IAlternativa, Perguntas} from '../../interfaces/perguntas';

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

  public getItemColor(item): any {
    return this.selectedItem === item ? this.itemColor : null;
  }

  public getIcon(item): any {
    return this.selectedItem === item ? this.itemIcon : null;
  }

  constructor(private service: PerguntasService) {
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

    if (!evento.resposta) {
      this.itemColor = "danger";
      this.itemIcon = "close-outline";
      return
    }
    this.itemColor = "success";
    this.itemIcon = "checkmark-outline";
    this.itensDesabilitados = true;

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
      // TALKBACK-5 :: Adicionar modal de agradecimento final
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
