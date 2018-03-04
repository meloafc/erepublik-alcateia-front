import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FeedbackService {

  private mostrarMensagemSubject = new Subject<string>();

  constructor() { }

  mostrarMensagem(mensagem: string) {
    this.mostrarMensagemSubject.next(mensagem);
  }

  getmostrarMensagemObservable(): Observable<string> {
    return this.mostrarMensagemSubject.asObservable();
  }

}
