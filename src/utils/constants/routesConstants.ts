import { getObjValuesAsArrayOfStrings } from 'utils/helpers';

export const ROUTES = {
  APP_ROOT: '/',
  HOME: '/home',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  CHANGE_PASSWORD: '/change-password',
  REST_PASSWORD: '/reset-password',
  LEADS: {
    LIST: '/leads',
    CREATE: '/leads/create',
    EDIT: '/leads/edit/:leadId',
    VIEW: '/leads/view/:leadId',
  },
};

export const ROUTES_ARRAY = getObjValuesAsArrayOfStrings(ROUTES);

export default ROUTES;
