import { Player } from './../model/player';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ErepublikService {

  public URL = 'http://erepublik-server.herokuapp.com/';

  constructor(private http: HttpClient) {

  }

  getPlayer(id): Observable<any> {
    return this.http.get<any>(this.URL + 'player/' + id);
  }

  novoTime(name): Observable<any> {
    return this.http.post(this.URL + 'team', { name: name});
  }

  adicionarJogadores(timeId, jogadores: Player[]): Observable<any> {
    return this.http.post(this.URL + 'team/players', { timeId: timeId, listaJogadores: jogadores});
  }

  getTimeAtivo(): Observable<any> {
    return this.http.get<any>(this.URL + 'teamHistory');
  }

}
