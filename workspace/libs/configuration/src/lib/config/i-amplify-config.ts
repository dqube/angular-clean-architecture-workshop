export interface IAmplifyConfig {
  Auth: {
    mandatorySignIn: boolean;
    region: string;
    userPoolId: string;
    identityPoolId: string;
    userPoolWebClientId: string;
  };
  Storage: {
    region: string;
    bucket: string;
    identityPoolId: string;
  };
  API: {
    endpoints: [
      {
        name: string;
        endpoint: string;
        region: string;
      }
    ];
  };
}
