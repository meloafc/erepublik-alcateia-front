import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ErepublikService {

  private path;
  playersCollection: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore, private http: HttpClient) {
    this.playersCollection = db.collection<any>('players');
  }

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

/*
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
