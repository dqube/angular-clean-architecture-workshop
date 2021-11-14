import moment = require('moment');
import { RelativeDateHeaderPipe } from './relative-date-header.pipe';

describe('RelativeDateHeaderPipe', () => {
  let relativeDateHeader: RelativeDateHeaderPipe;
  let currentDate: moment.Moment;

  beforeEach(() => {
    relativeDateHeader = new RelativeDateHeaderPipe();
    currentDate = moment();
  });

  it('create an instance', () => {
    expect(relativeDateHeader).toBeTruthy();
  });

  it('Input is not a date', () => {
    const actualResult = relativeDateHeader.transform('testString');
    const expectedResult = 'testString';
    expect(actualResult).toEqual(expectedResult);
  });

  it('Input Date is of today then result should be Today.', () => {
    const actualResult = relativeDateHeader.transform(currentDate);
    const expectedResult = `Today`;
    expect(actualResult).toEqual(expectedResult);
  });

  it('Input Date is of yesterday then result should be Yesterday.', () => {
    const testDate = currentDate.subtract(1, 'days');
    const actualResult = relativeDateHeader.transform(testDate);
    const expectedResult = `Yesterday`;
    expect(actualResult).toEqual(expectedResult);
  });

  it('Input Date is of past date(10/11/2020) then result should be Date 10/11/2020', () => {
    const testDate = moment('2020-10-11');
    const actualResult = relativeDateHeader.transform(testDate);
    const expectedResult = moment(testDate).format('M/DD/YYYY');
    expect(actualResult).toEqual(expectedResult);
  });

  it('Input Date is of past date(01/15/2020) then result should be Date 1/15/2020', () => {
    const testDate = moment('2020-01-15');
    const actualResult = relativeDateHeader.transform(testDate);
    const expectedResult = moment(testDate).format('M/DD/YYYY');
    expect(actualResult).toEqual(expectedResult);
  });
});
