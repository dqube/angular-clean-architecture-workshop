import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'buildmotion-pricing',
  templateUrl: 'pricing.component.html'
})
export class PricingComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('pricing-page');
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('pricing-page');
  }
}
