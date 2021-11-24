/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewAccount } from '@buildmotion/accounts/types';
import { IAPIConfig } from '@buildmotion/configuration';

// tslint:disable-next-line:no-empty-interface
export interface IHttpAccountsServiceRepositoryService {
  apiConfig: IAPIConfig;
  createAccount<T>(newAccount: NewAccount): any;
}
