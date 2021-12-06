import { Component, OnInit } from '@angular/core';
import { NotificationService, NotifierType } from '@buildmotion/notifications';

@Component({
  selector: 'buildmotion-toaster-notifier',
  templateUrl: './toaster-notifier.component.html',
  styleUrls: ['./toaster-notifier.component.scss']
})
export class ToasterNotifierComponent implements OnInit {

  message = '';

  constructor(
    private notifications: NotificationService
  ) {

  }

  ngOnInit(): void {
    this.notifications.notifications$.subscribe(item => {
      if (item.notifierType === NotifierType.Toast) {
        this.message = item.description;
      }
    })
  }

}
