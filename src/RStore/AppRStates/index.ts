import { AlertOptions, LoadingOptions } from '@ionic/react';
import { atom } from 'recoil';

export const appWiseIonicLoaderRStateAtom = atom<{
  showLoader: boolean;
  loaderProps: LoadingOptions;
}>({
  key: 'appWiseIonicLoaderRStateAtom_key',
  default: {
    showLoader: false,
    loaderProps: {
      message: 'Loading...',
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
    },
  },
});
