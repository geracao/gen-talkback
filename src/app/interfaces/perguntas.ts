export class Perguntas {
    constructor(
        public pergunta: string,
        public disciplina: string,
        public imagem: IImagem,
        public alternativas: IAlternativa[]) {
    }
}

export interface IAlternativa {
    descricao: string,
    resposta: boolean
}

export interface IImagem {
    diretorio: string,
    textoAlternativo: string
}