const GENERAL = {
  FILE: {
    FILE_DELETED_SUCCESS_MESSAGE: 'File deleted successfully.',
  },
  INVALID_REQUEST: 'invalid request.',
  LOADING: 'Please wait a minute, Loading...',
  SUCCESS: 'Request completed.',
  SUCCESS_SUBHEADING: 'Request completed Successfully.',
  SUCCESS_MESSAGE: 'Your Request completed Successfully!',
  REGISTER_USER_SUCCESSED: 'Registered successfully.',
  LOGIN_SUCCESSFULLY: 'Login successfully.',
  LOGOUT_SUCCESSFULLY: 'Logout successfully.',
  REGISTER_USER_FAILD: 'Something went wrong! 😐.',
  FAILED: 'Request Failed.',
  FAILED_SUBHEADING: 'Something went wrong :(',
  FAILED_MESSAGE: 'Error Occurred, request failed, please try again.',
  NOT_FOUND: 'Item not found!',
  FORM: {
    INVALID: 'Form is Invalid, Please fill all required form fields first.',
    FIELDS_INVALID: {
      NAME: 'Please enter a Name it is required.',
      Email: 'Please enter a email it is required.',
      NOT_VALID_Email: 'Email not valid! Please enter a valid email address.',
    },
    API_KEY_REQUIRED: 'API name is required',
    PASSWORD_NOT_MATCH: 'Password does not match. please try again!',
  },
  DELETE_USER_ACCOUNT_CONFIRM: 'Please type the phrase exactly as it appears.',
  DELETE_USER_ACCOUNT_REASON: 'Please specify reason!',
  INVALID_USERDATA: 'Invalid user data found!',
  DELETING_ACCOUNT: 'Deleting your account...',
  USER_ACCOUNT_SUCCESS_DELETE_MESSAGE: 'Account deleted Successfully.',
  INVALID_AUTH_TOKEN:
    'Invalid or no auth token found, please try again or login again.',
  API_REQUEST: {
    FETCHING: 'Fetching up-to-date data...',
    FETCHING_SINGLE_DATA: 'Fetching data...',
    CREATING: 'Creating a new record...',
    UPDATING: 'Updating the record data...',
    DELETING: 'Deleting the record...',
  },
  PROCESSING_LOGIN: 'Processing login request...',
  UNAUTHENTICATED: 'Unauthenticated, Please login to continue.',
};

const MODALS = {
  EMBED_WIDGETS_MODAL: {
    CUSTOM_HTML: 'Please enter a Custom HTML code it is required.',
    CUSTOM_Javascript: 'Please enter a Custom Javascript code it is required.',
    DELAY: 'Please enter a delay seconds it is required.',
  },
};

// Add Constants Above this one, and then include them in this object
const MESSAGES = {
  GENERAL,
  MODALS,
};

export default MESSAGES;
