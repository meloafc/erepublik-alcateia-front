import { HttpClient } from '@angular/common/http';
import { FeedbackService } from './../../partials/feedback/feedback.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss']
})
export class ManualComponent implements OnInit {

  public id;
  public players: string[] = [];

  constructor(
    private feedbackService: FeedbackService,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  getPlayer(id): Observable<any> {
    return this.http.get<any>('http://localhost:5000/player/' + id);
  }

  adicionar() {
    this.getPlayer(this.id).subscribe(
      json => {
        console.log(json);
        if (json.name) {
          this.players.push(json.name);
        } else {
          this.feedbackService.mostrarMensagem('Jogador não encontrado.');
        }
      },
      erro => {
        this.feedbackService.mostrarMensagem('Ocorreu um erro ao tentar carregar jogador.');
      }
    );
  }

}
