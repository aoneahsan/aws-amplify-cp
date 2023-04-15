import { Auth } from '@aws-amplify/auth';
import { IonAlert, IonLoading, IonToast } from '@ionic/react';
import QuickActions from '@/components/QuickActions';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { IAwsCurrentUserInfo } from '@/types/AwsAmplify/userData.type';
import { ION_TOAST } from '@/utils/constants';
import { getUserAuthDataFromCurrentUserInfo } from '@/utils/helpers/aws-amplify';
import MESSAGES from '@/utils/messages';
import { useZIonLoading } from '@/ZaionsHooks/zIonic-hooks';
import AppRoutes from '@/AppRoutes';
import {
  appWiseIonicAlertRStateAtom,
  appWiseIonicLoaderRStateAtom,
  appWiseIonicToastRStateAtom,
  userAuthRStateAtom,
} from '@/RStore';
import { reportCustomError } from '@/utils/customError';

// Use this to add global listeners etc (where state is needed), if state is not needed then try and prefer "AppEntryPoint.tsx"
const ZaionsApp: React.FC = () => {
  const [userAuthState, setUserAuthState] = useRecoilState(userAuthRStateAtom);
  const resetUserAuthRState = useResetRecoilState(userAuthRStateAtom);
  const appWiseIonLoaderState = useRecoilValue(appWiseIonicLoaderRStateAtom);
  const appWiseIonAlertState = useRecoilValue(appWiseIonicAlertRStateAtom);
  const appWiseIonToastState = useRecoilValue(appWiseIonicToastRStateAtom);
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();

  useEffect(() => {
    // when user data is null (in dep array i put the id field as that will get set to null or some string which is better than a object check)
    if (!userAuthState) {
      void (async () => {
        try {
          if (!appWiseIonLoaderState.showLoader) {
            presentZIonLoader();
          }

          const _awsCurrentUserInfo =
            (await Auth.currentUserInfo()) as IAwsCurrentUserInfo;
          const _userData =
            getUserAuthDataFromCurrentUserInfo(_awsCurrentUserInfo);
          dismissZIonLoader();

          setUserAuthState(_userData);
        } catch (error) {
          dismissZIonLoader();
          reportCustomError({ error });
          resetUserAuthRState();
        }
      })();
    }

    // eslint-disable-next-line
  }, [userAuthState?.id]);

  return (
    <>
      <AppRoutes />
      <QuickActions />
      <IonLoading
        isOpen={appWiseIonLoaderState.showLoader}
        message={
          appWiseIonLoaderState.loaderProps.message || MESSAGES.GENERAL.LOADING
        }
        keyboardClose={appWiseIonLoaderState.loaderProps.keyboardClose}
        showBackdrop={appWiseIonLoaderState.loaderProps.showBackdrop}
      />
      <IonAlert
        isOpen={appWiseIonAlertState.showAlert}
        header={
          appWiseIonAlertState.alertProps.header || MESSAGES.GENERAL.SUCCESS
        }
        subHeader={
          appWiseIonAlertState.alertProps.subHeader ||
          MESSAGES.GENERAL.SUCCESS_SUBHEADING
        }
        message={
          appWiseIonAlertState.alertProps.message ||
          MESSAGES.GENERAL.SUCCESS_MESSAGE
        }
        buttons={
          appWiseIonAlertState.alertProps.buttons || [
            {
              text: 'Okay',
              role: 'dismiss',
            },
          ]
        }
        keyboardClose={appWiseIonAlertState.alertProps.keyboardClose}
        backdropDismiss={appWiseIonAlertState.alertProps.backdropDismiss}
      />
      <IonToast
        isOpen={appWiseIonToastState.showToast}
        header={
          appWiseIonToastState.toastProps.header || MESSAGES.GENERAL.SUCCESS
        }
        message={
          appWiseIonToastState.toastProps.message ||
          MESSAGES.GENERAL.SUCCESS_MESSAGE
        }
        keyboardClose={appWiseIonToastState.toastProps.keyboardClose}
        duration={
          appWiseIonToastState.toastProps.duration || ION_TOAST.TOAST_DURATION
        }
        color={appWiseIonToastState.toastProps.color || 'success'}
        position={appWiseIonToastState.toastProps.position || 'bottom'}
        buttons={appWiseIonToastState.toastProps.buttons}
        layout={appWiseIonToastState.toastProps.layout}
      />
    </>
  );
};

export default ZaionsApp;
