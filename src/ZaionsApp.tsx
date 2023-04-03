import { Auth, CognitoUser } from '@aws-amplify/auth';
import { IonAlert, IonLoading } from '@ionic/react';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { zConsoleLog } from 'utils/helpers';
import AppRoutes from './AppRoutes';
import {
  appWiseIonicAlertRStateAtom,
  appWiseIonicLoaderRStateAtom,
  userAuthRStateAtom,
} from './RStore';
import { reportCustomError } from './utils/customError';

// Use this to add global listeners etc (where state is needed), if state is not needed then try and prefer "AppEntryPoint.tsx"
const ZaionsApp: React.FC = () => {
  const [userAuthState, setUserAuthState] = useRecoilState(userAuthRStateAtom);
  const resetUserAuthRState = useResetRecoilState(userAuthRStateAtom);
  const [appWiseIonLoaderState, setAppWiseIonLoaderState] = useRecoilState(
    appWiseIonicLoaderRStateAtom
  );
  const appWiseIonAlertState = useRecoilValue(appWiseIonicAlertRStateAtom);

  useEffect(() => {
    if (!userAuthState) {
      void (async () => {
        try {
          if (!appWiseIonLoaderState.showLoader) {
            setAppWiseIonLoaderState((oldVal) => ({
              ...oldVal,
              showLoader: true,
            }));
          }

          const _userData = (await Auth.currentUserInfo()) as CognitoUser;
          zConsoleLog({
            message: '[ZaionsApp] - setting userdata is available in recoil',
            data: { _userData },
          });
          setUserAuthState(_userData);

          setAppWiseIonLoaderState((oldVal) => ({
            ...oldVal,
            showLoader: false,
          }));
        } catch (error) {
          reportCustomError({ error });
          resetUserAuthRState();
        }
      })();
    }

    console.count('re-rendered');

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AppRoutes />
      <IonLoading
        isOpen={appWiseIonLoaderState.showLoader}
        message={appWiseIonLoaderState.loaderProps.message}
        keyboardClose={appWiseIonLoaderState.loaderProps.keyboardClose}
        showBackdrop={appWiseIonLoaderState.loaderProps.showBackdrop}
      />
      <IonAlert
        isOpen={appWiseIonAlertState.showAlert}
        header={appWiseIonAlertState.alertProps.header}
        subHeader={appWiseIonAlertState.alertProps.subHeader}
        message={appWiseIonAlertState.alertProps.message}
        buttons={appWiseIonAlertState.alertProps.buttons}
        keyboardClose={appWiseIonAlertState.alertProps.keyboardClose}
        backdropDismiss={appWiseIonAlertState.alertProps.backdropDismiss}
      />
    </>
  );
};

export default ZaionsApp;
