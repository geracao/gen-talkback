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
  itemDesabilitado: boolean;
  exibirNotificacaoSucesso: boolean;
  selectedItem: any;

  constructor(private service: PerguntasService) {
  }

  
  public getItemColor(item): any {
    return this.selectedItem === item ? this.itemColor : null
  }

  public getIcon(item): any {
    return this.selectedItem === item ? this.itemIcon : null
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

  onClickAlternativa(evento: IAlternativa){
    this.selectedItem = evento

    if(!evento.resposta){
      this.itemColor = "danger"
      this.itemIcon = "close-outline"
      return
    }
    this.itemColor = "success"
    this.itemIcon = "checkmark-outline"

    // TODO: TALKBACK-4 :: Adicionar modal "sucesso" para ir para a próxima pergunta
    setTimeout(() => {
      this.itemDesabilitado = true
      this.proximaPergunta();
    }, 3000);
    
  }

  proximaPergunta(){
    console.log('aoba')
  }

  ngOnDestroy(): void {
    if (this.inscricao) {
      this.inscricao.unsubscribe();
    }
  }
}
