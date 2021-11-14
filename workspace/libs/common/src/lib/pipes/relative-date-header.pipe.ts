import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'relativeDateHeader',
  pure: true,
})
export class RelativeDateHeaderPipe implements PipeTransform {
  transform(value: any): any {
    moment.locale('en-US');

    if (isNaN(Date.parse(value))) {
      return value;
    }

    const receivedMsgStartOfDay = moment(value).startOf('day');
    const currentStartOfDay = moment().startOf('day');
    const diffDays = currentStartOfDay.diff(receivedMsgStartOfDay, 'days');

    if (diffDays == 0) {
      return 'Today';
    } else if (diffDays == 1) {
      return 'Yesterday';
    } else {
      return receivedMsgStartOfDay.format('M/DD/YYYY');
    }
  }
}
