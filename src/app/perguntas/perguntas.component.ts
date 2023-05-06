import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {PerguntasService} from '../services/perguntas.service';
import {Subscription} from 'rxjs';
import {Perguntas} from '../interfaces/perguntas';

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

  constructor(private service: PerguntasService) {
  }

  ngOnInit() {
    this.inscricao = this.service.obterTodas().subscribe(
      response => this.carregarPerguntas(response),
      error => console.log(error)
    )
  }

  carregarPerguntas(response: Perguntas[]) {
    this.perguntas = response || [];
  }

  ngOnDestroy(): void {
    if (this.inscricao) {
      this.inscricao.unsubscribe();
    }
  }
}
