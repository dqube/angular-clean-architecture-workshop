
export class VersionInfo {
  application: string;
  version: string;
  buildDate: Date;
  hash: string;

  constructor(application: string, version: string, buildDate: Date, hash?: string) {
    this.application = application;
    this.version = version;
    this.buildDate = buildDate;
    this.hash = hash;
  }
}
