import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
declare var componentHandler: any;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[mdl-upgrade]'
})
export class MdlUpgradeDirective implements AfterViewInit {

  // atualiza os componentes do mdl sempre que a view é trocada.
  // fonte: https://stackoverflow.com/a/35451821
  ngAfterViewInit() {
    componentHandler.upgradeAllRegistered();
  }

}
