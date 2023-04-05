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
import { isAuthenticatedRStateSelector, userAuthRStateAtom } from 'RStore';
import ROUTES from 'utils/constants/routesConstants';
import { reportCustomError } from 'utils/customError';
import { useZIonLoading, useZIonToastSuccess } from 'ZaionsHooks/zionic-hooks';

const DEFAULT_TITLE = 'AWS Amplify CP';

interface IPageHeaderProps {
  pageTitle?: string;
}

const PageHeader: React.FC<IPageHeaderProps> = ({ pageTitle }) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedRStateSelector);
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();
  const { presentZIonToastSuccess } = useZIonToastSuccess();
  const setUserAuthState = useSetRecoilState(userAuthRStateAtom);

  const handleSignoutRequest = async () => {
    presentZIonLoader();
    try {
      await Auth.signOut();

      presentZIonToastSuccess();

      setUserAuthState(null);
    } catch (error) {
      reportCustomError(error);
    }
    dismissZIonLoader();
  };

  const handleAccountDeleteRequest = async () => {
    presentZIonLoader();
    try {
      await Auth.deleteUser();

      presentZIonToastSuccess();

      setUserAuthState(null);
    } catch (error) {
      reportCustomError(error);
    }
    dismissZIonLoader();
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
              <IonButton color='primary' fill='solid' routerLink={ROUTES.LOGIN}>
                SignIn
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default PageHeader;
