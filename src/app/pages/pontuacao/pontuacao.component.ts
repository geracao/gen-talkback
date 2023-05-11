import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IonicModule, NavController} from '@ionic/angular';

@Component({
    selector: 'app-pontuacao',
    templateUrl: 'pontuacao.component.html',
    styleUrls: ['pontuacao.component.scss'],
    standalone: true,
    imports: [IonicModule],
})

export class PontuacaoComponent implements OnInit {
    quantidadePerguntas: number;
    respostasCorretas: number;
    pontuacaoRespostas: number;

    constructor(
        protected nav: NavController,
        protected router: Router) { }

    ngOnInit() {
        this.router.getCurrentNavigation().extras.state.map(param => {
            switch (param.data) {
                case 'quantidadePerguntas': this.quantidadePerguntas = param.value
                case 'respostasCorretas': this.respostasCorretas = param.value
                case 'pontuacaoRespostas': this.pontuacaoRespostas = param.value
            };
        })
    }

    async onClickReiniciar() {
        await this.nav.navigateBack('home');
    }

}
