import { Component, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  private menuLateral: any;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef
  ) { }


  ngAfterViewInit() {
    this.menuLateral = this.elementRef.nativeElement.querySelector('.mdl-layout');
    this.cdr.detectChanges();
  }

  navegarParaTimeAtivo() {
    this.router.navigate(['/active-team']);
    this.alternarStatusMenuLateral();
  }

  alternarStatusMenuLateral() {
    this.menuLateral.MaterialLayout.toggleDrawer();
  }


}
