import { FeedbackService } from './../../partials/feedback/feedback.service';
import { Component, OnInit } from '@angular/core';

import * as request from 'request';
import * as cheerio from 'cheerio';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss']
})
export class ManualComponent implements OnInit {

  public id;
  public players: string[] = [];

  constructor(
    private feedbackService: FeedbackService
  ) { }

  ngOnInit() {
  }

  adicionar() {
    const url = 'https://www.erepublik.com/br/citizen/profile/' + this.id;
    const players = this.players;
    const feedbackService = this.feedbackService;
    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(body);

            $('img.citizen_avatar').each(function(i, element) {
              const player = $(this).attr('alt');
              players.push(player);
              feedbackService.mostrarMensagem(player + ' adicionado');
            });

        } else {
          if (response.statusCode === 404) {
            feedbackService.mostrarMensagem('Jogador não encontrado');
          }
          console.log(error);
        }
    });
  }

}
