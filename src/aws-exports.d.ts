declare module '@/aws-exports' {
  const config: {
    Auth: {
      identityPoolId: string;
      region: string;
      userPoolId: string;
      userPoolWebClientId: string;
    };
    API: {
      endpoints: {
        [key: string]: {
          name: string;
          endpoint: string;
          region: string;
        };
      };
    };
  };
  export default config;
}
