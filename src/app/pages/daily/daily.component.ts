import { LoadingService } from './../../partials/loading/loading.service';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent {

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

  displayedColumns = ['position', 'name', 'totalMedalsWon', 'initialMedals', 'finalMedals', 'startDate', 'endDate'];
  dataSource = new MatTableDataSource(new Array<Element>());

  @ViewChild(MatSort) sort: MatSort;

  constructor(private db: AngularFireDatabase, private loadingService: LoadingService) {
    db.list('teams').snapshotChanges().subscribe(list => {
      this.loadingService.colocarTelaEmEspera();
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

  updateView() {
    this.loadingService.colocarTelaEmEspera();
    this.team = this.db.object('team_players_rh/' + this.teamKeySelected).valueChanges();
    this.team.subscribe(list => {
      const players: Element[] = new Array<Element>();
      // tslint:disable-next-line:forin
      for (const i in list.players) {
        players.push(list.players[i]);
      }
      this.dataSource = new MatTableDataSource(players);
      this.dataSource.sort = this.sort;
      this.loadingService.removerTelaEmEspera();
    });
  }

}

export interface Combo {
  key: string;
  value: string;
}

export interface Element {
  position: number;
  name: string;
  startDate: string;
  initialMedals: number;
  endDate: string;
  finalMedals: number;
  totalMedalsWon: number;
}
