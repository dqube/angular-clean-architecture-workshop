import { EmailAddressFormatIsValidRule } from './email-address-format-is-valid.rule';

const showRuleMessages = true;
const hideRuleMessages = false;

describe('EmailAddressFormatIsValidRule', () => {
  it('should create instance', () => {
    const rule = new EmailAddressFormatIsValidRule(
      'EmailAddressFormatIsValidRule',
      'The email address value is not valid.',
      'joe@turncommerce.com',
      showRuleMessages
    );

    expect(rule).toBeTruthy();
  });

  it('should render invalid with without required elements', () => {
    const rule = new EmailAddressFormatIsValidRule('', '', '', true);

    const result = rule.execute();

    expect(result.isValid).toEqual(false);
  });

  it('should render valid with required elements', () => {
    const rule = new EmailAddressFormatIsValidRule(
      'EmailAddressFormatIsValidRule',
      'The email address value is not valid.',
      'joe@turncommerce.com',
      showRuleMessages
    );

    const result = rule.execute();

    expect(result.isValid).toEqual(true);
  });

  it('should render invalid with no @ symbol', () => {
    const rule = new EmailAddressFormatIsValidRule(
      'EmailAddressFormatIsValidRule',
      'The email address value is not valid.',
      'joeturncommerce.com',
      showRuleMessages
    );

    const result = rule.execute();

    expect(result.isValid).toEqual(false);
  });

  it('should render invalid with invalid symbol', () => {
    const rule = new EmailAddressFormatIsValidRule(
      'EmailAddressFormatIsValidRule',
      'The email address value is not valid.',
      'joe%turncommerce.com',
      showRuleMessages
    );

    const result = rule.execute();

    expect(result.isValid).toEqual(false);
  });

  it('should render invalid with invalid TLD', () => {
    const rule = new EmailAddressFormatIsValidRule(
      'EmailAddressFormatIsValidRule',
      'The email address value is not valid.',
      'joe@turncommerce.!@#$',
      showRuleMessages
    );

    const result = rule.execute();

    expect(result.isValid).toEqual(false);
  });

  it('should render invalid with invalid domain', () => {
    const rule = new EmailAddressFormatIsValidRule(
      'EmailAddressFormatIsValidRule',
      'The email address value is not valid.',
      'joe@!@#$@#$.com',
      showRuleMessages
    );

    const result = rule.execute();

    expect(result.isValid).toEqual(false);
  });

  it('should render invalid with invalid max length', () => {
    const rule = new EmailAddressFormatIsValidRule(
      'EmailAddressFormatIsValidRule',
      'The email address value is not valid.',
      '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890@turncommerce.com',
      showRuleMessages
    );

    const result = rule.execute();

    expect(result.isValid).toEqual(false);
  });

  it('should render valid with min length', () => {
    const rule = new EmailAddressFormatIsValidRule('EmailAddressFormatIsValidRule', 'The email address value is not valid.', 'a@b.c', showRuleMessages);

    const result = rule.execute();

    expect(result.isValid).toEqual(true);
  });

  it('should render invalid min length', () => {
    const rule = new EmailAddressFormatIsValidRule('EmailAddressFormatIsValidRule', 'The email address value is not valid.', 'a@bc', showRuleMessages);

    const result = rule.execute();

    expect(result.isValid).toEqual(false);
  });
});
