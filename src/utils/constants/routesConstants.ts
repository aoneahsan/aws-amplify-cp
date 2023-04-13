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

export default ROUTES;
