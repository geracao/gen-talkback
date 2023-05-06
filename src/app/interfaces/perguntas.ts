export class Perguntas {
    constructor(
        public pergunta: string,
        public alternativas: IAlternativa[]) {
    }
}

export interface IAlternativa {
    descricao: string,
    resposta: boolean
}