export interface IWebConfig {
  applicationName: string;
  blogURL: string;
  companyEffectiveDate: Date;
  companyName: string;
  version: string;
  defaultPageSize: number;
  email: string;
  googleTagManagerId: string;
  keywordValidationInMilliseconds: number;
  pageSizeOptions: Array<number>;
  reloadDelayAfterNoticeInMinutes: number;
  reloadDelayInMinutes: number;
  reloadNoticeDisplayInSeconds: number;
  social: {
    facebook?: { name: string; URL: string };
    github?: { name: string; URL: string };
    instagram?: { name: string; URL: string };
    linkedin?: { name: string; URL: string };
    twitter?: { name: string; URL: string };
  };
  website: string;
}
