const _env = import.meta.env;
const apiUrl = _env.PROD ? _env.VITE_API_URL_PROD : _env.VITE_API_URL;
export const ENVS = {
  appTitle: _env.VITE_APP_TITLE || 'AWS Amplify CP',
  apiUrl: apiUrl ?? '',
  cryptoSecret: 'aws-amplify-app-secrect',
  googleMapsApiKey: _env.VITE_GOOGLE_MAP_API_KEY || '',
  isProduction: _env.PROD,
  isDevelopment: _env.DEV,
  isTesting: _env.MODE === 'testing',
};
