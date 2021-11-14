import { AreEqual } from './AreEqual';
import { AreNotEqual } from './AreNotEqual';
import { GuidIsValid } from './GuidIsValid';
import { IsFalse } from './IsFalse';
import { IsNotNullOrUndefined } from './IsNotNullOrUndefined';
import { IsNullOrUndefined } from './IsNullOrUndefined';
import { IsTrue } from './IsTrue';
import { Max } from './Max';
import { Min } from './Min';
import { Range } from './Range';
import { RulePolicy } from './RulePolicy';
import { RuleResult } from './RuleResult';
import { StringIsNotNullEmptyRange } from './StringIsNotNullEmptyRange';
import { StringIsRegExMatch } from './StringIsRegExMatch';

describe('AreEqual', () => {
  it('a should equal b', () => {
    const a = 1;
    const b = 1;
    const rule = new AreEqual('ValuesAreEqual', 'The values are not equal.', a, b, true);

    const result = rule.render();

    expect(result.isValid).toBeTruthy();
  });

  it('a should not equal b', () => {
    const a = 0;
    const b = 1;

    const rule = new AreEqual('ValuesAreEqual', 'The values are not equal.', a, b, true);

    const result = rule.render();

    expect(result.isValid).toBeFalsy();
  });

  it('a should not equal when they are different types', () => {
    const a = 0;
    const b = 'one';

    const rule = new AreEqual('ValuesAreEqual', 'The values are not equal.', a, b, true);

    const result = rule.render();

    expect(result.isValid).toBeFalsy();
  });
});

describe('AreNotEqual', () => {
  let result: RuleResult;
  let rule: RulePolicy;

  afterEach(() => {
    expect(result).toBeTruthy();
    expect(result.message).toBeTruthy();
    expect(result.rulePolicy.name).toBeTruthy();
    // expect(rule.execute).toBeCalled();
  });

  it('a does not equal b', () => {
    const a = 0;
    const b = 1;

    rule = new AreNotEqual('ValuesAreNotEqual', 'The values cannot be equal.', a, b, true);

    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('a should not be equal to b', () => {
    const a = 1;
    const b = 1;
    rule = new AreNotEqual('ValuesAreNotEqual', 'The values cannot be equal.', a, b, true);

    result = rule.render();

    expect(result.isValid).toEqual(false);
  });
});

describe('GuidIsValid', () => {
  let result: RuleResult;
  let rule: RulePolicy;

  afterEach(() => {
    expect(result).toBeTruthy();
    expect(result.message).toBeTruthy();
    expect(result.rulePolicy.name).toBeTruthy();
  });

  it('should be a valid Guid', () => {
    const target = '34c4af8b-8a47-45f7-ab0d-ce77a32a23fd';
    rule = new GuidIsValid('IdIsValid', 'The id value is not valid.', target, true);

    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  //   it('should NOT be a valid with empty value', () => {
  //     const target = '';
  //     rule = new GuidIsValid('IdIsValid', 'The id value is not valid.', target, true);

  //     result = rule.render();

  //     expect(result.isValid).toEqual(false);
  //   });

  it('should NOT be a valid with incomplete GUID', () => {
    const target = '34c4af8b-8a47-45f7-ab0d-'; //INCOMPLETE GUID VALUE
    rule = new GuidIsValid('IdIsValid', 'The id value is not valid.', target, true);

    result = rule.render();

    expect(result.isValid).toEqual(false);
  });
});

describe('IsFalse', () => {
  let result: RuleResult;
  let rule: RulePolicy;
  const isDisplayable = true;

  afterEach(() => {
    expect(result).toBeTruthy();
    expect(result.message).toBeTruthy();
    expect(result.rulePolicy.name).toBeTruthy();
  });

  it('should be false', () => {
    const target = false;
    rule = new IsFalse('TargetIsFalse', 'The target value is not false.', target, isDisplayable);

    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should NOT be true value', () => {
    const target = true;
    rule = new IsFalse('TargetIsFalse', 'The target value is not false.', target, isDisplayable);

    result = rule.render();

    expect(result.isValid).toEqual(false);
  });
});

describe('IsNotNullOrUndefined', () => {
  let result: RuleResult;
  let rule: RulePolicy;
  const isDisplayable = true;

  afterEach(() => {
    expect(result).toBeTruthy();
    expect(result.message).toBeTruthy();
    expect(result.rulePolicy.name).toBeTruthy();
  });

  it('should be not null or undefined', () => {
    const target = 'I am not undefined.';
    rule = new IsNotNullOrUndefined('TargetIsNotNullOrUndefined', 'The value cannot be null or undefined.', target, isDisplayable);

    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should NOT be valid with [null] value', () => {
    rule = new IsNotNullOrUndefined('TargetIsNotNullOrUndefined', 'The value cannot be null or undefined.', null, isDisplayable);

    result = rule.render();

    expect(result.isValid).toEqual(false);
  });

  it('should NOT be valid with undefined [number]', () => {
    const target = undefined; //INVALID;
    rule = new IsNotNullOrUndefined('TargetIsNotNullOrUndefined', 'The value cannot be null or undefined.', target, isDisplayable);

    result = rule.render();

    expect(result.isValid).toEqual(false);
  });

  it('should NOT be valid with undefined [Date]', () => {
    const target = null; //INVALID;
    rule = new IsNotNullOrUndefined('TargetIsNotNullOrUndefined', 'The value cannot be null or undefined.', target, isDisplayable);

    result = rule.render();

    expect(result.isValid).toEqual(false);
  });

  it('should be valid [number]', () => {
    const target = 1;
    rule = new IsNotNullOrUndefined('TargetIsNotNullOrUndefined', 'The value cannot be null or undefined.', target, isDisplayable);

    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should be valid [string]', () => {
    const target = 'one';
    rule = new IsNotNullOrUndefined('TargetIsNotNullOrUndefined', 'The value cannot be null or undefined.', target, isDisplayable);

    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should be valid [Date]', () => {
    const target = new Date();
    rule = new IsNotNullOrUndefined('TargetIsNotNullOrUndefined', 'The value cannot be null or undefined.', target, isDisplayable);

    result = rule.render();

    expect(result.isValid).toEqual(true);
  });
});

describe('IsNullOrUndefined', () => {
  let result: RuleResult;
  let rule: RulePolicy;
  const isDisplayable = true;

  afterEach(() => {
    expect(result).toBeTruthy();
    expect(result.message).toBeTruthy();
    expect(result.rulePolicy.name).toBeTruthy();
  });

  it('should NOT be valid defined [string] value', () => {
    const target = 'I am defined.';
    rule = new IsNullOrUndefined('TargetIsNullOrUndefined', 'The value must be null or undefined.', target, isDisplayable);

    result = rule.render();

    expect(result.isValid).toEqual(false);
  });

  it('should be valid with [null]', () => {
    rule = new IsNullOrUndefined('TargetIsNullOrUndefined', 'The value must be null or undefined', null, isDisplayable);

    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should be valid with undefined [number]', () => {
    const target = undefined;
    rule = new IsNullOrUndefined('TargetIsNullOrUndefined', 'The value must be null or undefined.', target, isDisplayable);

    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should be valid with undefined [Date]', () => {
    const target = undefined;
    rule = new IsNullOrUndefined('TargetIsNotNullOrUndefined', 'The value must be null or undefined.', target, isDisplayable);

    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should NOT be valid with defined [number]', () => {
    const target = 1;
    rule = new IsNullOrUndefined('TargetIsNotNullOrUndefined', 'The value must be null or undefined.', target, isDisplayable);

    result = rule.render();

    expect(result.isValid).toEqual(false);
  });

  it('should NOT be valid with defined [string]', () => {
    const target = 'one';
    rule = new IsNullOrUndefined('TargetIsNotNullOrUndefined', 'The value must be null or undefined.', target, isDisplayable);

    result = rule.render();

    expect(result.isValid).toEqual(false);
  });

  it('should NOT be valid with defined [Date]', () => {
    const target = new Date();
    rule = new IsNullOrUndefined('TargetIsNotNullOrUndefined', 'The value must be null or undefined.', target, isDisplayable);

    result = rule.render();

    expect(result.isValid).toEqual(false);
  });
});

describe('IsTrue', () => {
  let result: RuleResult;
  let rule: RulePolicy;
  const isDisplayable = true;

  afterEach(() => {
    expect(result).toBeTruthy();
    expect(result.message).toBeTruthy();
    expect(result.rulePolicy.name).toBeTruthy();
  });

  it('should equal true', () => {
    const target = true;
    rule = new IsTrue('TargetIsTrue', 'The target value must be true.', target, isDisplayable);
    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should be greater than 0', () => {
    const text = 'the value length is greater than 1 character';
    const target = text.length > 0;
    rule = new IsTrue('TargetIsTrue', 'The target value must be true.', target, isDisplayable);
    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should NOT equal true', () => {
    const target = false;
    rule = new IsTrue('TargetIsTrue', 'The target value must be true.', target, isDisplayable);
    result = rule.render();

    expect(result.isValid).toEqual(false);
  });

  it('should NOT be greater than 0', () => {
    const text = 'the value length is greater than 10 characters';
    const target = text.length > 0;
    rule = new IsTrue('TargetIsTrue', 'The target value must be true.', target, isDisplayable);
    result = rule.render();

    expect(result.isValid).toEqual(true);
  });
});

describe('Max', () => {
  let result: RuleResult;
  let rule: RulePolicy;

  afterEach(() => {
    expect(result).toBeTruthy();
    expect(result.message).toBeTruthy();
    expect(result.rulePolicy.name).toBeTruthy();
  });

  it('should not be greater than max value', () => {
    const target = 5;
    const comparison = 10;
    rule = new Max('TargetMaxValueIsValid', `The target value ${target} cannot be greater than max value of ${comparison}`, target, comparison);
    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should not be greater than max value with precision', () => {
    const target = 10.9998;
    const comparison = 10.9999;
    rule = new Max('TargetMaxValueIsValid', `The target value ${target} cannot be greater than max value of ${comparison}`, target, comparison);
    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should not be greater than max value [string length]', () => {
    const target = '123';
    const comparison = '1234567890';
    rule = new Max('TargetMaxValueIsValid', `The target value ${target} cannot be greater than max value of ${comparison}`, target, comparison);
    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should not be greater than max value [boolean]', () => {
    const target = false;
    const comparison = true;
    rule = new Max('TargetMaxValueIsValid', `The target value ${target} cannot be true.`, target, comparison);
    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should not be greater than max value [boolean]', () => {
    const target = true;
    const comparison = false;
    rule = new Max('TargetMaxValueIsValid', `The target value ${target} cannot be true.`, target, comparison);
    result = rule.render();

    expect(result.isValid).toEqual(false);
  });

  it('should not be greater than max value with comparison precision', () => {
    const target = 11; //invalid
    const comparison = 10.9999;
    rule = new Max('TargetMaxValueIsValid', `The target value ${target} cannot be greater than max value of ${comparison}`, target, comparison);
    result = rule.render();

    expect(result.isValid).toEqual(false);
  });

  it('should not be greater than max value with target precision', () => {
    const target = 10.9999; //invalid
    const comparison = 10.9998;
    rule = new Max('TargetMaxValueIsValid', `The target value ${target} cannot be greater than max value of ${comparison}`, target, comparison);
    result = rule.render();

    expect(result.isValid).toEqual(false);
  });

  it('should not be greater than max value [string] length', () => {
    const target = '1234567890';
    const comparison = '123';
    rule = new Max('TargetMaxValueIsValid', `The target value ${target} cannot be greater than max value of ${comparison}`, target, comparison);
    result = rule.render();

    expect(result.isValid).toEqual(false);
  });
});

describe('Min', () => {
  let result: RuleResult;
  let rule: RulePolicy;

  afterEach(() => {
    expect(result).toBeTruthy();
    expect(result.message).toBeTruthy();
    expect(result.rulePolicy.name).toBeTruthy();
  });

  it('should not be less than minimum comparison value', () => {
    const target = 12;
    const comparison = 10;
    rule = new Min('TargetValueMinValue', `The target value of ${target} minimum value is ${comparison}.`, target, comparison);
    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should not be less than minimum comparison [string] length value', () => {
    const target = '012';
    const comparison = '0';
    rule = new Min('TargetValueMinValue', `The target value of ${target} minimum value is ${comparison}.`, target, comparison);
    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should not be less than minimum [boolean] value', () => {
    const target = true;
    const comparison = false;
    rule = new Min('TargetValueMinValue', `The target value of ${target} minimum value is ${comparison}.`, target, comparison);
    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should not be less than minimum value', () => {
    const target = 1;
    const comparison = 10;
    rule = new Min('TargetValueMinValue', `The target value of ${target} minimum value is ${comparison}.`, target, comparison);
    result = rule.render();

    expect(result.isValid).toEqual(false);
  });

  it('should not be less than minimum [string] length value', () => {
    const target = '012';
    const comparison = '1234567890';
    rule = new Min('TargetValueMinValue', `The target value of ${target} minimum value is ${comparison}.`, target, comparison);
    result = rule.render();

    expect(result.isValid).toEqual(false);
  });

  it('should not be less than minimum [boolean] value', () => {
    const target = false;
    const comparison = true;
    rule = new Min('TargetValueMinValue', `The target value of ${target} minimum value is ${comparison}.`, target, comparison);
    result = rule.render();

    expect(result.isValid).toEqual(false);
  });
});

describe('Range', () => {
  let result: RuleResult;
  let rule: RulePolicy;

  afterEach(() => {
    expect(result).toBeTruthy();
    expect(result.message).toBeTruthy();
    expect(result.rulePolicy.name).toBeTruthy();
  });

  it('should be within numeric range', () => {
    const target = 5;
    const start = 1;
    const end = 10;
    rule = new Range('TargetIsWithinRange', `The target value of ${target} must be within the range of ${start} and ${end}.`, target, start, end);
    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should NOT be within range, target outside of upper bounds', () => {
    const target = 99; //invalid;
    const start = 1;
    const end = 10;
    rule = new Range('TargetIsWithinRange', `The target value of ${target} must be within the range of ${start} and ${end}.`, target, start, end);
    result = rule.render();

    expect(result.isValid).toEqual(false);
  });

  it('should be within range (lower bound)', () => {
    const target = 1;
    const start = 1;
    const end = 10;
    rule = new Range('TargetIsWithinRange', `The target value of ${target} must be within the range of ${start} and ${end}.`, target, start, end);
    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should be within range (upper bound)', () => {
    const target = 10;
    const start = 1;
    const end = 10;
    rule = new Range('TargetIsWithinRange', `The target value of ${target} must be within the range of ${start} and ${end}.`, target, start, end);
    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should be within range (lower bound) with precision', () => {
    const target = 1.1234;
    const start = 1.1234;
    const end = 10;
    rule = new Range('TargetIsWithinRange', `The target value of ${target} must be within the range of ${start} and ${end}.`, target, start, end);
    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should be within range (upper bound) with precision', () => {
    const target = 10.1234;
    const start = 1;
    const end = 10.1234;
    rule = new Range('TargetIsWithinRange', `The target value of ${target} must be within the range of ${start} and ${end}.`, target, start, end);
    result = rule.render();

    expect(result.isValid).toEqual(true);
  });
});

describe('StringIsNotNullEmptyRange', () => {
  let result: RuleResult;
  let rule: RulePolicy;
  const isDisplayable = true;

  afterEach(() => {
    expect(result).toBeTruthy();
    expect(result.message).toBeTruthy();
    expect(result.rulePolicy.name).toBeTruthy();
  });

  it('should not be null or empty range', () => {
    const target = '1234';
    const minLength = 1;
    const maxLength = 10;
    rule = new StringIsNotNullEmptyRange(
      'StringIsNotNullEmptyRange',
      `The length of the value must be within ${minLength}, and ${maxLength}.`,
      target,
      minLength,
      maxLength,
      isDisplayable
    );
    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should not be null or empty range (upper bounds)', () => {
    const target = '1234';
    const minLength = 1;
    const maxLength = 4;
    rule = new StringIsNotNullEmptyRange(
      'StringIsNotNullEmptyRange',
      `The length of the value must be within ${minLength}, and ${maxLength}.`,
      target,
      minLength,
      maxLength,
      isDisplayable
    );
    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should not be null or empty range (lower bounds)', () => {
    const target = '1';
    const minLength = 1;
    const maxLength = 10;
    rule = new StringIsNotNullEmptyRange(
      'StringIsNotNullEmptyRange',
      `The length of the value must be within ${minLength}, and ${maxLength}.`,
      target,
      minLength,
      maxLength,
      isDisplayable
    );
    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should not be null', () => {
    const target: any = null;
    const minLength = 1;
    const maxLength = 10;
    rule = new StringIsNotNullEmptyRange('StringIsNotNullEmptyRange', `The target value cannot be null.`, target, minLength, maxLength, isDisplayable);
    result = rule.render();

    expect(result.isValid).toEqual(false);
  });

  it('should NOT be within range', () => {
    const target = '1';
    const minLength = 5;
    const maxLength = 10;
    rule = new StringIsNotNullEmptyRange(
      'StringIsNotNullEmptyRange',
      `The length of the value must be within ${minLength}, and ${maxLength}.`,
      target,
      minLength,
      maxLength,
      isDisplayable
    );
    result = rule.render();

    expect(result.isValid).toEqual(false);
  });

  it('should NOT be within range', () => {
    const target = '99';
    const minLength = 5;
    const maxLength = 10;
    rule = new StringIsNotNullEmptyRange(
      'StringIsNotNullEmptyRange',
      `The length of the value must be within ${minLength}, and ${maxLength}.`,
      target,
      minLength,
      maxLength,
      isDisplayable
    );
    result = rule.render();

    expect(result.isValid).toEqual(false);
  });
});

describe('StringIsRegExMatch', () => {
  let result: RuleResult;
  let rule: RulePolicy;
  const isDisplayable = true;

  afterEach(() => {
    expect(result).toBeTruthy();
    expect(result.message).toBeTruthy();
    expect(result.rulePolicy.name).toBeTruthy();
  });

  it('should match regular expression with (5) numbers exactly', () => {
    const target = '12345';
    const regex = /^[+ 0-9]{5}$/;
    rule = new StringIsRegExMatch('NumbersRegularExpression', 'The target value must be numbers only.', target, regex, isDisplayable);
    result = rule.render();

    expect(result.isValid).toEqual(true);
  });

  it('should not exceed the valid amount of numbers', () => {
    const target = '123456'; //invalid amount of numbers;
    const regex = /^[+ 0-9]{5}$/;
    rule = new StringIsRegExMatch('NumbersRegularExpression', 'The target value must be numbers only.', target, regex, isDisplayable);
    result = rule.render();

    expect(result.isValid).toEqual(false);
  });

  it('should not contain non-numeric characters', () => {
    const target = '123abc';
    const regex = /^[+ 0-9]{5}$/;
    rule = new StringIsRegExMatch('NumbersRegularExpression', 'The target value must be numbers only.', target, regex, isDisplayable);
    result = rule.render();

    expect(result.isValid).toEqual(false);
  });
});

describe('CompositeRule', () => {
  let rule: StringIsNotNullEmptyRange;

  it('should contain multiple rules', () => {
    rule = new StringIsNotNullEmptyRange('CompositeRule', 'This rule has composite rule members.', 'hello', 1, 10);

    expect(rule.hasRules()).toEqual(true);
  });
});
