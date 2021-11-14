import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'sentMessageTime',
  pure: true,
})
export class SentMessageTimePipe implements PipeTransform {
  transform(value: any): any {
    moment.locale('en-US');

    if (isNaN(Date.parse(value))) {
      return value;
    }

    const sentMessageTime = moment(value);
    const sentMsgStartOfDay = moment(value).startOf('day');
    const currentStartOfDay = moment().startOf('day');
    const diffDays = currentStartOfDay.diff(sentMsgStartOfDay, 'days');

    if (diffDays == 0) {
      return sentMessageTime.format('h:mm A');
    } else if (diffDays == 1) {
      return 'Yesterday';
    } else {
      return sentMsgStartOfDay.format('M/DD/YYYY');
    }
  }
}
