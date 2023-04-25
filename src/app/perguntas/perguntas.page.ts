import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-perguntas',
  templateUrl: './perguntas.page.html',
  styleUrls: ['./perguntas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PerguntasPage implements OnInit {
  public form: FormGroup<any>;
  public validationMessages!: { [key: string]: { [key: string]: string; }; };
  
  constructor(
    protected formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      resposta: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onClickConfirmar(){
    console.log('Confirmado!');
  }

  
  protected setValidationMessages(messages: { [key: string]: { [key: string]: string } }): void {
    this.validationMessages = messages;
  }

}
