import {Injectable} from '@angular/core';
import {Observable, from} from 'rxjs';

import {Perguntas} from '../interfaces/perguntas';
import jsonPerguntas from '../../assets/perguntas.json'

@Injectable({
  providedIn: 'root'
})
export class PerguntasService {

  constructor() {}

  obterTodas(): Observable<Perguntas[]> {
    return from(this.obterTodasInterno());
  }

  private obterTodasInterno(): Promise<Perguntas[]> {
    return new Promise((resolve, reject) => {
      resolve(jsonPerguntas)
    })
  }
}
