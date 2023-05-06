export class Perguntas {
    constructor(
        public pergunta: string,
        public alternativas: IAlternativa[]) {
    }
}

interface IAlternativa {
    descricao: string,
    valor: number
}