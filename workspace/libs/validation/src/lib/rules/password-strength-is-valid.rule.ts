import {
  CompositeRule,
  RuleConstants,
  StringIsNotNullEmptyRange,
  StringIsRegExArrayMatch,
} from '@buildmotion/rule-engine';

// import { RuleConstants } from './rule-constants';

/**
 * Use to validate the format of an email address. Expects:
 *
 * 1. string is not null or undefined
 * 2. string length is within specified value
 * 3. string value matches RegEx
 *
 *
 * Resource: https://emailregex.com/
 */
export class PasswordStrengthIsValidRule extends CompositeRule {
  constructor(
    name: string,
    message: string,
    private password: string,
    isDisplayable = true
  ) {
    super(name, message, isDisplayable);
    this.configureRules();
  }

  configureRules() {
    this.rules.push(
      new StringIsNotNullEmptyRange(
        'PasswordStringIsValid',
        'The password value is not valid. Must be within 8 and 128 characters.',
        this.password,
        8,
        128,
        true
      )
    );

    const regularExpressions = [
      RuleConstants.lowercaseAlphaCharacterRegEx,
      RuleConstants.uppercaseAlphaCharacterRegEx,
      RuleConstants.numericCharactersRegEx,
      RuleConstants.specialCharacterRegEx,
    ];

    this.rules.push(
      new StringIsRegExArrayMatch(
        'EmailAddressContainsValidCharacters',
        'The password strength is not valid.',
        this.password,
        regularExpressions,
        true
      )
    );
  }
}
