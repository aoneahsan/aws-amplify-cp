export const ION_LOADER_DEFAULTS = {
  animated: true,
  duration: 1500,
};

export const ION_TOAST = {
  TOAST_DURATION: 1500,
};

export const ZaionsBusinessDetails = {
  WebsiteUrl: 'https://zaions.com',
};

export const ZaionsRHelmetDefaults = {
  title: 'Zaions Url Shortener Web & Mobile App - Zaions',
  description: 'Zaions Url Shortener Web & Mobile App',
  keywords: 'zaions1, zaions2',
  author: 'Ahsan Mahmood',
  viewport: 'width=device-width, initial-scale=1.0',
  refresh: '8100',
  ogTitle: 'Zaions.com',
  ogType: 'website',
  ogUrl: ZaionsBusinessDetails.WebsiteUrl,
  // ogImage: ProductLogo,
  ogDescription: 'Zaions The Group of Projects',
  ogLocale: 'en_US',
  ogSiteName: 'Zaions',
  twitterCard: 'zaions_logo',
  twitterSite: '@zaions',
  twitterCreator: '#aoneahsan',
  twitterTitle: 'Zaions',
  twitterDescription: ' The Group of Projects',
  // twitterImage: ProductLogo,
  // shortcutIcon: productSmLogo,
  contentSecurityPolicy:
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
  XUACompatible: 'ie=edge',
  copyRight: 'Copyright 2021',
  roboto: 'index,follow',
  // ...
};

export const SocialLinks = {
  twitter: `${ZaionsBusinessDetails.WebsiteUrl}/twitter`,
  instagram: `${ZaionsBusinessDetails.WebsiteUrl}/instagram`,
  linkdin: `${ZaionsBusinessDetails.WebsiteUrl}/linkdin`,
};

export const DateTime = {
  iso8601DateTime: 'YYYY-MM-DDTHH:mm:ssZ',
};

export const LOCALSTORAGE_KEYS = {
  USERDATA: 'udhsaf38h_3g-23g-c',
  AUTHTOKEN: 'cewiuh4ggb284ghg',
};

export const TIMEZONES = [
  {
    label: '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi',
    value: '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi',
  },
  {
    label: '(GMT) Western Europe Time, London, Lisbon, Casablanca',
    value: '(GMT) Western Europe Time, London, Lisbon, Casablanca',
  },
  {
    label: '(GMT +1:00) Brussels, Copenhagen, Madrid, Paris',
    value: '(GMT +1:00) Brussels, Copenhagen, Madrid, Paris',
  },
  {
    label: '(GMT +2:00) Kaliningrad, South Africa',
    value: '(GMT +2:00) Kaliningrad, South Africa',
  },
  {
    label: '(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg',
    value: '(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg',
  },
  { label: '(GMT +3:30) Tehran', value: '(GMT +3:30) Tehran' },
  {
    label: '(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi',
    value: '(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi',
  },
  { label: '(GMT +4:30) Kabul', value: '(GMT +4:30) Kabul' },
  {
    label: '(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent',
    value: '(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent',
  },
  {
    label: '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi',
    value: '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi',
  },
  {
    label: '(GMT +6:00) Almaty, Dhaka, Colombo',
    value: '(GMT +6:00) Almaty, Dhaka, Colombo',
  },
  {
    label: '(GMT +7:00) Bangkok, Hanoi, Jakarta',
    value: '(GMT +7:00) Bangkok, Hanoi, Jakarta',
  },
  {
    label: '(GMT +8:00) Beijing, Perth, Singapore, Hong Kong',
    value: '(GMT +8:00) Beijing, Perth, Singapore, Hong Kong',
  },
  {
    label: '(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk',
    value: '(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk',
  },
  {
    label: '(GMT +9:30) Adelaide, Darwin',
    value: '(GMT +9:30) Adelaide, Darwin',
  },
  {
    label: '(GMT +10:00) Eastern Australia, Guam, Vladivostok',
    value: '(GMT +10:00) Eastern Australia, Guam, Vladivostok',
  },
  {
    label: '(GMT +11:00) Magadan, Solomon Islands, New Caledonia',
    value: '(GMT +11:00) Magadan, Solomon Islands, New Caledonia',
  },
  {
    label: '(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka',
    value: '(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka',
  },
];

export const NOTIFICATIONS = {
  MODAL_FORM_ERROR_TOAST: {
    DURATION: 4000,
  },
  ReactToastify: {
    autoclose: 5000,
  },
  ZIonAlerts: {
    OKAY_BUTTON: {
      TEXT: 'Okay',
      ROLE: 'okay_dismiss',
    },
    CANCEL_BUTTON: {
      TEXT: 'Cancel',
      ROLE: 'cancel_dismiss',
    },
  },
};

export const IonLoadersIDs = {
  AuthScreenLoader: 'AuthScreenLoader',
};

export const CONSTANTS = {
  ION_LOADER_DEFAULTS,
  ION_TOAST,
  NO_VALUE_FOUND: '-',
  ZaionsRHelmetDefaults,
  SocialLinks,
  DateTime,
};

export default CONSTANTS;
