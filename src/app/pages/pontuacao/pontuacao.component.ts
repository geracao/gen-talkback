import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
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
    disciplinaSelecionada: string;

    constructor(
        protected nav: NavController,
        protected router: Router) { }

    ngOnInit() {
        this.obterParametrosPelaRota();
    }

    async onClickReiniciar() {
        let navigationExtras: NavigationExtras = {
            state: {
                disciplina: this.disciplinaSelecionada
            }
        };

        await this.nav.navigateForward('home');
        await this.nav.navigateForward('perguntas', navigationExtras)
    }

    async onClickVoltar() {
        await this.nav.navigateBack('home');
    }

    private obterParametrosPelaRota() {
        let state = this.router.getCurrentNavigation().extras.state;
        if (!state) return;

        state.map(param => {
            if (param.data == 'disciplina')
                this.disciplinaSelecionada = param.value;

            switch (param.data) {
                case 'quantidadePerguntas': this.quantidadePerguntas = param.value
                case 'respostasCorretas': this.respostasCorretas = param.value
                case 'pontuacaoRespostas': this.pontuacaoRespostas = param.value
            };
        })
    }
}
