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

  team: Observable<any>;
  items: Observable<Element[]>;

  displayedColumns = ['position', 'name', 'startDate', 'initialMedals', 'endDate', 'finalMedals', 'totalMedalsWon'];
  dataSource = new MatTableDataSource(new Array<Element>());

  @ViewChild(MatSort) sort: MatSort;

  constructor(private db: AngularFireDatabase) {
    this.team = db.object('team_players_rh/-L1EyslRaoS3BSldCdPj').valueChanges();
    this.items = db.list('team_players_rh/-L1EyslRaoS3BSldCdPj/players').valueChanges();
    this.items.subscribe(list => {
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.sort = this.sort;
    });
  }

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
