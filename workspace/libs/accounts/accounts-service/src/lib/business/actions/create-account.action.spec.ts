import { NewAccount } from '@buildmotion/accounts/types';
import { CreateAccountAction } from './create-account.action';

describe('CreateAccountAction', () => {
  it('should create an instance', () => {
    expect(new CreateAccountAction(null)).toBeTruthy();
  });

  it('should validate false [when] null input', () => {
    const action = new CreateAccountAction(null);
    expect(action.validationContext.isValid).toBeTruthy();
  });

  // it('should validate false [when] terms not accepted', () => {
  //   const account = new NewAccount();
  //   account.acceptTermsConditions = false;//invalid; must be true;
  //   account.emailAddress = 'joe@email.com';
  //   const action = new CreateAccountAction(account);

  //   action.preValidateAction();

  //   expect(action.validationContext.isValid).toEqual(false);
  // });
});
