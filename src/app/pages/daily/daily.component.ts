import { LoadingService } from './../../partials/loading/loading.service';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  teamKeySelected = '';

  set teamKey(value: any) {
    this.teamKeySelected = value;
    this.updateView();
  }

  get teamKey() {
    return this.teamKeySelected;
  }

  team: Observable<any>;
  teams: Combo[] = new Array<Combo>();

  players: Element[] = new Array<Element>();
  sortedData;

  constructor(private db: AngularFireDatabase, private loadingService: LoadingService) {
    db.list('teams', ref => ref.orderByChild('visible').equalTo(true)).snapshotChanges().subscribe(list => {
      // tslint:disable-next-line:forin
      for (const i in list) {
        const combo = {
          key: list[i].key,
          value: list[i].payload.val().name
        };
        this.teams.push(combo);
      }
      this.teamKeySelected = this.teams[this.teams.length - 1].key;
      this.updateView();
    });
  }

  ngOnInit(): void {
    this.sort.active = 'position';
    this.sort.direction = 'asc';
    this.loadingService.colocarTelaEmEspera();
  }

  sortData(sort: Sort) {
    const data = this.getOriginalData();
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
        case 'startDate': return compare(a.startDate, b.startDate, isAsc);
        case 'endDate': return compare(a.endDate, b.endDate, isAsc);
        default: return 0;
      }
    });
  }

  getOriginalData() {
    const copy: Element[] = new Array<Element>();
    // tslint:disable-next-line:forin
    for (const i in this.players) {
      copy.push(this.players[i]);
    }
    return copy;
  }

  updateView() {
    this.loadingService.colocarTelaEmEspera();
    this.team = this.db.object('team_players_rh/' + this.teamKeySelected).valueChanges();
    this.team.subscribe(list => {
      this.players = new Array<Element>();
      // tslint:disable-next-line:forin
      for (const i in list.players) {
        this.players.push(list.players[i]);
      }
      this.sortedData = this.players;
      this.sortData(this.sort);
      this.loadingService.removerTelaEmEspera();
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

export interface Combo {
  key: string;
  value: string;
}

export interface Element {
  position: string;
  name: string;
  startDate: string;
  initialMedals: number;
  endDate: string;
  finalMedals: number;
  totalMedalsWon: number;
}
