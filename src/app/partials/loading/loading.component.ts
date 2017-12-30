import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {

  telaEmEspera = false;
  private esperaSubscription: Subscription;

  constructor(
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.esperaSubscription = this.loadingService.getEsperaObservable().subscribe(
      telaEmEspera => this.telaEmEspera = telaEmEspera
    );
  }

  ngOnDestroy() {
    this.esperaSubscription.unsubscribe();
  }

}
