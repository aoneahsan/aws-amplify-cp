import { Auth, CognitoUser } from '@aws-amplify/auth';
import { IonAlert, IonLoading } from '@ionic/react';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { zConsoleLog } from 'utils/helpers';
import { useZIonLoading } from 'ZaionsHooks/zionic-hooks';
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
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();
  const [compState, setCompState] = useState({ processing: false });
  const [appWiseIonLoaderState, setAppWiseIonLoaderState] = useRecoilState(
    appWiseIonicLoaderRStateAtom
  );
  const [appWiseIonAlertState, setAppWiseIonAlertState] = useRecoilState(
    appWiseIonicAlertRStateAtom
  );

  const getCurrentAuthUser = useCallback(async () => {
    return (await Auth.currentUserInfo()) as CognitoUser;
  }, []);

  useEffect(() => {
    if (!userAuthState) {
      void (async () => {
        try {
          // await presentZIonLoader();
          // setCompState((oldVal) => ({
          //   ...oldVal,
          //   processing: true,
          // }));
          if (!appWiseIonLoaderState.showLoader) {
            setAppWiseIonLoaderState((oldVal) => ({
              ...oldVal,
              showLoader: true,
            }));
          }

          const _userData = await getCurrentAuthUser();
          zConsoleLog({
            message: '[ZaionsApp] - setting userdata is available in recoil',
            data: { _userData },
          });
          // setUserAuthState(_userData);

          setAppWiseIonAlertState((oldVal) => ({
            ...oldVal,
            showAlert: true,
            alertProps: {
              ...oldVal.alertProps,
              header: 'Success',
              subHeader: 'Anything',
              message: 'measgfskdjbf adf asd asd',
            },
          }));

          // await dismissZIonLoader();
          // setCompState((oldVal) => ({
          //   ...oldVal,
          //   processing: false,
          // }));
          setAppWiseIonLoaderState((oldVal) => ({
            ...oldVal,
            showLoader: false,
          }));
        } catch (error) {
          reportCustomError({ error });
          resetUserAuthRState();
          await dismissZIonLoader();
        }
      })();
    }

    console.count('re-rendered');

    return () => {
      void dismissZIonLoader();
    };
    // eslint-disable-next-line
  }, []);

  if (compState.processing) {
    return <>Loading...</>;
  }

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
