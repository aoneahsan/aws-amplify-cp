export const routesDynamicParts = {
  leadId: ':leadId',
  leadAddressId: ':leadAddressId',
  leadContactId: ':leadContactId',
};

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
    EDIT: `/leads/edit/${routesDynamicParts.leadId}`,
    VIEW: `/leads/view/${routesDynamicParts.leadId}`,
    ADD_ADDRESS: `/leads/view/${routesDynamicParts.leadId}/addresses/create`,
    EDIT_ADDRESS: `/leads/view/${routesDynamicParts.leadId}/addresses/edit/${routesDynamicParts.leadAddressId}`,
    ADD_CONTACT: `/leads/view/${routesDynamicParts.leadId}/contacts/create`,
    EDIT_CONTACT: `/leads/view/${routesDynamicParts.leadId}/contacts/edit/${routesDynamicParts.leadContactId}`,
  },
};

export default ROUTES;
