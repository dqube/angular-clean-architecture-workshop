import { ApiProperty } from '@nestjs/swagger';
import { passwordOptions } from './new-account-password.validators';

export class CreateBase {
  @ApiProperty(
    {
      type: Date,
    }
  )
  createdOn?: Date;

  @ApiProperty()
  createdBy?: string;
}

export class NewAccount extends CreateBase {
  @ApiProperty({
    description: 'Indicates if the user has accepted the terms and conditions.',
    default: false
  })
  acceptTermsConditions: boolean;

  @ApiProperty({
    description: 'The account user name [email address].',
    minLength: 5,
    maxLength: 120,
    required: true
  })
  emailAddress: string;

  @ApiProperty(passwordOptions())
  password: string;

  @ApiProperty()
  passwordConfirm: string;
}
