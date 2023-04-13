import { Auth } from '@aws-amplify/auth';
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import classNames from 'classnames';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isAuthenticatedRStateSelector, userAuthRStateAtom } from '@/RStore';
import ROUTES from '@/utils/constants/routesConstants';
import { reportCustomError } from '@/utils/customError';
import {
  useZIonAlert,
  useZIonLoading,
  useZIonToastSuccess,
} from '@/ZaionsHooks/zIonic-hooks';

const DEFAULT_TITLE = 'AWS Amplify CP';

interface IPageHeaderProps {
  pageTitle?: string;
}

const PageHeader: React.FC<IPageHeaderProps> = ({ pageTitle }) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedRStateSelector);
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();
  const { presentZIonToastSuccess } = useZIonToastSuccess();
  const setUserAuthState = useSetRecoilState(userAuthRStateAtom);
  const { presentZIonAlert } = useZIonAlert();

  const handleSignoutRequest = () => {
    try {
      presentZIonAlert({
        header: 'SignOut',
        subHeader: 'Sign out from account.',
        message: 'Do you want to sign out right now?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
          },
          {
            text: 'Yes',
            role: 'continue',
            handler: async () => {
              presentZIonLoader();

              await Auth.signOut();
              dismissZIonLoader();

              presentZIonToastSuccess();

              setUserAuthState(null);
            },
          },
        ],
      });
    } catch (error) {
      reportCustomError(error);
    }
  };

  const handleAccountDeleteRequest = () => {
    try {
      presentZIonAlert({
        header: 'Delete Account',
        subHeader: 'Permanently Delete Account.',
        message:
          "Do you want to delete your account and all it' data permanently?",
        buttons: [
          {
            text: 'No',
            role: 'cancel',
          },
          {
            text: 'Yes',
            role: 'continue',
            handler: async () => {
              presentZIonLoader();

              await Auth.deleteUser();
              dismissZIonLoader();

              presentZIonToastSuccess();

              setUserAuthState(null);
            },
          },
        ],
      });
    } catch (error) {
      reportCustomError(error);
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar className={classNames('ok')}>
          <IonMenuToggle slot='start' />
          <IonTitle slot='start'>{`${
            pageTitle ? pageTitle + ' - ' + DEFAULT_TITLE : DEFAULT_TITLE
          }`}</IonTitle>
          <IonButtons slot='end'>
            {isAuthenticated ? (
              <>
                <IonButton
                  color='primary'
                  fill='solid'
                  routerLink={ROUTES.DASHBOARD}
                >
                  Dashboard
                </IonButton>
                <IonButton
                  color='danger'
                  fill='outline'
                  onClick={() => void handleSignoutRequest()}
                >
                  SignOut
                </IonButton>
                <IonButton
                  color='danger'
                  fill='solid'
                  onClick={() => void handleAccountDeleteRequest()}
                >
                  Delete Account
                </IonButton>
              </>
            ) : (
              <>
                <IonButton
                  color='primary'
                  fill='solid'
                  routerLink={ROUTES.LOGIN}
                >
                  SignIn
                </IonButton>
                <IonButton
                  color='primary'
                  fill='outline'
                  routerLink={ROUTES.REGISTER}
                >
                  SignUp
                </IonButton>
              </>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default PageHeader;
