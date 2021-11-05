export class RuleConstants {
  /* eslint-disable max-len, no-control-regex, no-useless-escape */
  static readonly emailAddressFormatRegEx: RegExp = /(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  static readonly alphaNumericCaseInsensitiveRegEx: RegExp = /^[a-zA-Z0-9\-\s]*$/;

  static readonly lowercaseAlphaCharacterRegEx: RegExp = /[a-z]+/;

  static readonly numericCharactersRegEx: RegExp = /[0-9]+/;

  /**
   * Use to determine if the target string contains a special character:
   * !@#$%^&*()-_+=.,<>'"|
   */
  // eslint-disable-next-line no-control-regex, no-useless-escape
  static readonly specialCharacterRegEx: RegExp = /[!@#$%^&*()\-_\+=.,<>'"\|]+/;

  static readonly uppercaseAlphaCharacterRegEx: RegExp = /[A-Z]+/;
}
