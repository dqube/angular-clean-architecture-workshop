import moment = require('moment');
import { SentMessageTimePipe } from './sent-message-time.pipe';

describe('SentMessageTimePipe', () => {
  let sentMessageTimePipe: SentMessageTimePipe;
  let currentTime: moment.Moment;
  let currentEndOfDay: moment.Moment;

  beforeEach(() => {
    sentMessageTimePipe = new SentMessageTimePipe();
    currentTime = moment();
    currentEndOfDay = moment().endOf('day');
  });

  it('create an instance', () => {
    expect(sentMessageTimePipe).toBeTruthy();
  });

  it('SentMessageTime is not date', () => {
    const actualResult = sentMessageTimePipe.transform('testString');
    const expectedResult = 'testString';
    expect(actualResult).toEqual(expectedResult);
  });

  it('SentMessageTime is CurrentTime then result should be displayed in this format h:mm a', () => {
    const actualResult = sentMessageTimePipe.transform(currentTime);
    const expectedResult = currentTime.format('h:mm A');
    expect(actualResult).toEqual(expectedResult);
  });

  it('SentMessageTime is 1 hour ago from current end of the day then result should display current time in this format h:mm a', () => {
    const testDate = currentEndOfDay.subtract('1', 'hours');
    const actualResult = sentMessageTimePipe.transform(testDate);
    const expectedResult = testDate.format('h:mm A');
    expect(actualResult).toEqual(expectedResult);
  });

  it('SentMessageTime is 23 hours ago from current end of the day then result should display current time in this format ', () => {
    const testDate = currentEndOfDay.subtract('23', 'hours');
    const actualResult = sentMessageTimePipe.transform(testDate);
    const expectedResult = testDate.format('h:mm A');
    expect(actualResult).toEqual(expectedResult);
  });

  it('SentMessageTime is 27 hours ago from current end of the day then result should display Yesterday', () => {
    const testDate = currentEndOfDay.subtract('27', 'hours');
    const actualResult = sentMessageTimePipe.transform(testDate);
    const expectedResult = 'Yesterday';
    expect(actualResult).toEqual(expectedResult);
  });

  it('SentMessageTime is of yesterday then result should be Yesterday', () => {
    const testDate = currentTime.subtract(1, 'days');
    const actualResult = sentMessageTimePipe.transform(testDate);
    const expectedResult = 'Yesterday';
    expect(actualResult).toEqual(expectedResult);
  });

  it('SentMessageTime is of past date(10/11/2020) then result should be Date 10/11/2020', () => {
    const testDate = moment('2020-10-11');
    const actualResult = sentMessageTimePipe.transform(testDate);
    const expectedResult = moment(testDate).format('M/DD/YYYY');
    expect(actualResult).toEqual(expectedResult);
  });

  it('SentMessageTime is of past date(01/15/2020) then result should be Date 1/15/2020', () => {
    const testDate = moment('2020-01-15');
    const actualResult = sentMessageTimePipe.transform(testDate);
    const expectedResult = moment(testDate).format('M/DD/YYYY');
    expect(actualResult).toEqual(expectedResult);
  });
});
