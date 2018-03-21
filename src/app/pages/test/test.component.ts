import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  ngOnInit(): void {
    /*
    request('https://www.erepublik.com/br/citizen/profile/4032742', function (error, response, body) {
        console.log('https://www.erepublik.com/br/citizen/profile/4032742');
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(body);

            $('img.citizen_avatar').each(function(i, element) {
                console.log('Player=' + $(this).attr('alt'));
            });

            $('#achievment').find('li').each(function(i, element) {
                const medal = $(this).children('img').attr('alt');
                if (medal === 'resistance hero') {
                    console.log(medal + '=' + $(this).children('.counter').text());
                }
            });
        } else {
            console.log(error);
        }
    });
    */
  }
}
