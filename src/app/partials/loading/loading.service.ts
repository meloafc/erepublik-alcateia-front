import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoadingService {

  private esperaSubject = new Subject<boolean>();

  constructor() { }

  colocarTelaEmEspera() {
    this.esperaSubject.next(true);
  }

  removerTelaEmEspera() {
    this.esperaSubject.next(false);
  }

  getEsperaObservable(): Observable<boolean> {
    return this.esperaSubject.asObservable();
  }

}
