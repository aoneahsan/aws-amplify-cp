import { ION_TOAST } from './../../utils/constants/index';
import { AlertOptions, LoadingOptions, ToastOptions } from '@ionic/react';
import { atom } from 'recoil';
import MESSAGES from 'utils/messages';

export const appWiseIonicLoaderRStateAtom = atom<{
  showLoader: boolean;
  loaderProps: LoadingOptions;
}>({
  key: 'appWiseIonicLoaderRStateAtom_key',
  default: {
    showLoader: false,
    loaderProps: {
      message: MESSAGES.GENERAL.LOADING,
      showBackdrop: true,
      keyboardClose: true,
    },
  },
});
export const appWiseIonicAlertRStateAtom = atom<{
  showAlert: boolean;
  alertProps: AlertOptions;
}>({
  key: 'appWiseIonicAlertRStateAtom_key',
  default: {
    showAlert: false,
    alertProps: {
      keyboardClose: true,
      animated: true,
      buttons: [
        {
          text: 'Okay',
          role: 'dismiss',
        },
      ],
      backdropDismiss: true,
      message: MESSAGES.GENERAL.SUCCESS,
      header: MESSAGES.GENERAL.SUCCESS,
      subHeader: MESSAGES.GENERAL.SUCCESS,
    },
  },
});
export const appWiseIonicToastRStateAtom = atom<{
  showToast: boolean;
  toastProps: ToastOptions;
}>({
  key: 'appWiseIonicToastRStateAtom_key',
  default: {
    showToast: false,
    toastProps: {
      keyboardClose: true,
      animated: true,
      buttons: [
        {
          text: 'Okay',
          role: 'dismiss',
        },
      ],
      message: MESSAGES.GENERAL.SUCCESS,
      header: MESSAGES.GENERAL.SUCCESS,
      color: 'primary',
      duration: ION_TOAST.TOAST_DURATION,
      position: 'bottom',
      layout: 'stacked',
    },
  },
});
