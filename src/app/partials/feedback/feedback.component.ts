import { Subscription } from 'rxjs/Subscription';
import { FeedbackService } from './feedback.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit, OnDestroy {

  private mostrarMensagemSubscription: Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private feedbackService: FeedbackService
  ) { }

  ngOnInit() {
    this.mostrarMensagemSubscription = this.feedbackService.getmostrarMensagemObservable().subscribe(
      mensagem => {
        this.snackBar.open(mensagem, 'OK', {
          duration: 3000,
        });
      }
    );
  }

  ngOnDestroy() {
    this.mostrarMensagemSubscription.unsubscribe();
  }

}
