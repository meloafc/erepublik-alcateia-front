import { ErepublikService } from './services/erepublik.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private erepublikService: ErepublikService) {
    this.erepublikService.get();
  }
}
