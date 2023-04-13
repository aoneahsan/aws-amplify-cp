const _env = import.meta.env;

const apiUrl = _env.PROD ? _env.VITE_API_URL_PROD : _env.VITE_API_URL;
export const ENVS = {
  REACT_APP_TITLE: _env.VITE_TITLE || 'ZLink',
  REACT_APP_API_URL: apiUrl ?? '',
  REACT_APP_CRYPTO_SECRET: 'zlink-app-secrect',
  REACT_APP_GOOGLE_MAP_API_KEY: _env.VITE_GOOGLE_MAP_API_KEY || '',
  isProduction: _env.PROD,
  isDevelopment: _env.DEV,
  isTesting: _env.MODE === 'test',
};
