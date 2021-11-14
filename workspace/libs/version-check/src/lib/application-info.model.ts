export class ApplicationInfo {
  application = '';
  version: string;
  hash: string;
  timestamp: Date;

  constructor(currentVersion?: string) {
    this.version = currentVersion ? currentVersion : '';
  }
}
