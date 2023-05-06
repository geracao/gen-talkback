import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

@Component({
  selector: 'app-perguntas',
  templateUrl: './perguntas.component.html',
  styleUrls: ['./perguntas.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PerguntasComponent implements OnInit {
  public form: FormGroup<any>;
  public validationMessages!: {[key: string]: {[key: string]: string;};};

  perguntas = [
    {
      descricao: "Qual das alternativas abaixo não apresenta um problema ambiental",
      alternativas: [
        {descricao: "Caça de diversos animais silvestres", valor: 1},
        {descricao: "Retirada da vegetação nativa local", valor: 2},
        {descricao: "Infiltração da água da chuva no solo", valor: 3},
        {descricao: "Desflorestamento de matas nativas", valor: 4},
      ]
    }
  ]

  constructor(
    protected formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      resposta: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onClickConfirmar() {
    console.log('Confirmado!');
  }


  protected setValidationMessages(messages: {[key: string]: {[key: string]: string}}): void {
    this.validationMessages = messages;
  }


}
