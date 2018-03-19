import { ErepublikService } from './../../services/erepublik.service';
import { LoadingService } from './../../partials/loading/loading.service';
import { Player } from './../../model/player';
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

  public equipeId;
  public nomeEquipe;
  public id;
  public players: Player[] = [];

  constructor(
    private erepublikService: ErepublikService,
    private loadingService: LoadingService,
    private feedbackService: FeedbackService,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  adicionar() {
    this.loadingService.colocarTelaEmEspera();
    this.erepublikService.getPlayer(this.id).subscribe(
      json => {
        this.loadingService.removerTelaEmEspera();
        if (json.name) {
          if (this.contem(json)) {
            this.feedbackService.mostrarMensagem('Jogador já está salvo.');
          } else {
            this.players.unshift(json);
            this.feedbackService.mostrarMensagem('Jogador salvo.');
          }
        } else {
          this.feedbackService.mostrarMensagem('Jogador não encontrado.');
        }
      },
      erro => {
        this.loadingService.removerTelaEmEspera();
        this.feedbackService.mostrarMensagem('Ocorreu um erro ao tentar carregar jogador.');
      }
    );
  }

  contem(player: Player) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id === player.id) {
        return true;
      }
    }
    return false;
  }

  remover(player: Player) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id === player.id) {
        this.players.splice(i, 1);
        return;
      }
    }
  }

  criarEquipe() {
    this.loadingService.colocarTelaEmEspera();
    this.erepublikService.novoTime(this.nomeEquipe).subscribe(
      retorno => {

        this.erepublikService.adicionarJogadores(retorno.id, this.players).subscribe(
          retorno2 => {
            this.loadingService.removerTelaEmEspera();
            this.feedbackService.mostrarMensagem('Equipe criada.');
          },
          erro => {
            this.loadingService.removerTelaEmEspera();
            this.feedbackService.mostrarMensagem('Ocorreu um erro ao tentar criar equipe.');
          }
        );

      },
      erro => {
        this.loadingService.removerTelaEmEspera();
        this.feedbackService.mostrarMensagem('Ocorreu um erro ao tentar criar equipe.');
      }
    );
    console.log(this.players);
  }

}
