import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'buildmotion-lock',
  templateUrl: 'lock.component.html'
})
export class LockComponent implements OnInit, OnDestroy {
  focus;
  constructor() {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('lock-page');
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('lock-page');
  }
}
