import { ApiPropertyOptions } from "@nestjs/swagger";

export function passwordOptions(): ApiPropertyOptions {
  const options: ApiPropertyOptions = {
    default: 'A$ecur3P@ssword2022',
    description: `The password portion of the user's login credentials.`,
    minLength: 8,
    maxLength: 256,
    name: 'Password',
    required: true,
    type: 'string'
  }
  return options;
}
