import { Sort, MatSort } from '@angular/material';
import { PlayerHistory } from './../../model/player-history';
import { TeamHistory } from './../../model/team-history';
import { FeedbackService } from './../../partials/feedback/feedback.service';
import { ErepublikService } from './../../services/erepublik.service';
import { LoadingService } from './../../partials/loading/loading.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-active-team',
  templateUrl: './active-team.component.html',
  styleUrls: ['./active-team.component.scss']
})
export class ActiveTeamComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  public dataInicial;
  public ultimaAtualizacao;
  public teamHistory: TeamHistory;
  sortedData;

  constructor(
    private erepublikService: ErepublikService,
    private feedbackService: FeedbackService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.sort.active = 'position';
    this.sort.direction = 'asc';
    this.loadingService.colocarTelaEmEspera();
    this.erepublikService.getTimeAtivo().subscribe(
      json => {
        this.loadingService.removerTelaEmEspera();
        this.converter(json);
        this.sortData(this.sort);
      },
      erro => {
        this.loadingService.removerTelaEmEspera();
        this.feedbackService.mostrarMensagem('Ocorreu um erro ao tentar se comunicar com o servidor.');
      }
    );
  }

  converter(json) {
    const players: PlayerHistory[] = [];

    // tslint:disable-next-line:forin
    for (const i in json.players) {
      const player: PlayerHistory = json.players[i];
      player.startTime = moment(player.startTime).format('DD/MM/YYYY HH:mm:ss');
      player.endTime = moment(player.endTime).format('DD/MM/YYYY HH:mm:ss');

      players.push(player);
    }

    this.teamHistory = new TeamHistory();
    this.teamHistory.endTime = json.endTime;
    this.teamHistory.name = json.name;
    this.teamHistory.players = players;
    this.teamHistory.startTime = json.startTime;
    this.teamHistory.totalMedalsWon = json.totalMedalsWon;

    this.dataInicial = moment(json.startTime).format('DD/MM/YYYY HH:mm:ss');
    this.ultimaAtualizacao = moment(json.endTime).format('DD/MM/YYYY HH:mm:ss');
  }

  sortData(sort: Sort) {
    if (!this.teamHistory) {
      return;
    }

    const data = this.teamHistory.players;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'position': {
          if (!a.position.split || !b.position.split) {
            return compare(a.position, b.position, isAsc);
          }

          return compareNumber(a.position.split(/[ ,]+/)[0], b.position.split(/[ ,]+/)[0], isAsc);
        }
        case 'name': return compareString(a.name, b.name, isAsc);
        case 'totalMedalsWon': return compareNumber(a.totalMedalsWon, b.totalMedalsWon, isAsc);
        case 'initialMedals': return compareNumber(a.initialMedals, b.initialMedals, isAsc);
        case 'finalMedals': return compareNumber(a.finalMedals, b.finalMedals, isAsc);
        case 'startDate': return compare(a.startTime, b.startTime, isAsc);
        case 'endDate': return compare(a.endTime, b.endTime, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function compareString(a: string, b: string, isAsc) {
  return a.localeCompare(b) * (isAsc ? 1 : -1);
}

function compareNumber(a, b, isAsc) {
  if (isAsc) {
    return a - b;
  }
  return b - a;
}
