import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ErepublikService {

  items: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.items = db.list('items').valueChanges();
  }

/*
  add(player: any) {
    this.playersCollection.add(JSON.parse(JSON.stringify(player)));
  }

  get() {
    this.http.get<any>('https://api.erepublik-deutschland.de/' + environment.erepublikApiKey + '/players/details/9043982').subscribe(
      (json) => {
        this.add(json);
      }
    );
  }


  update(pass: Pass) {
    const passDoc = this.afs.doc<Pass>(this.path + '/' + pass.id);
    passDoc.update(this.getCopy(pass));
  }

  delete(pass: Pass) {
    const passDoc = this.afs.doc<Pass>(this.path + '/' + pass.id);
    passDoc.delete();
  }

  getCopy(pass: Pass): Pass {
    return <Pass> JSON.parse(JSON.stringify(pass));
  }
*/

}
