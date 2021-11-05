export interface IDataDogConfig {
  logs: {
    site: string,
    clientToken: string,
    forwardErrorsToLogs: boolean,
    sampleRate: number
  },
  realUserMonitoring: {
    applicationId: string,
    clientToken: string,
    site: string,
    service: string,
    env: string,
    version: string,
    sampleRate: number,
    trackInteractions: boolean
  }
}
