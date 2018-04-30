import { Component, OnInit } from '@angular/core';
import { Team } from '../../model/team';
import { ErepublikService } from '../../services/erepublik.service';
import { LoadingService } from '../../partials/loading/loading.service';
import { FeedbackService } from '../../partials/feedback/feedback.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  public teams: Team[] = [];

  constructor(
    private feedbackService: FeedbackService,
    private loadingService: LoadingService,
    private erepublikService: ErepublikService
  ) { }

  ngOnInit() {
    this.carregarTimes();
  }

  carregarTimes() {
    this.loadingService.colocarTelaEmEspera();
    this.erepublikService.getListaTimes().subscribe(
      json => {
        this.loadingService.removerTelaEmEspera();
        this.teams = json;
      },
      erro => {
        this.loadingService.removerTelaEmEspera();
        this.feedbackService.mostrarMensagem('Ocorreu um erro ao tentar carregar a lista de times.');
      }
    );
  }

  editar(team: Team) {
    console.log(team);
  }

}
