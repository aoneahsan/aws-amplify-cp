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
import { useRecoilValue } from 'recoil';
import { isAuthenticatedRStateSelector } from '@/RStore';
import ROUTES from '@/utils/constants/routesConstants';
import { reportCustomError } from '@/utils/customError';
import { zConsoleLog } from '@/utils/helpers';

const DEFAULT_TITLE = 'AWS Amplify CP';

interface IPageHeaderProps {
  pageTitle?: string;
}

const PageHeader: React.FC<IPageHeaderProps> = ({ pageTitle }) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedRStateSelector);

  const handleSignoutRequest = async () => {
    try {
      const result = (await Auth.signOut()) as unknown;
      zConsoleLog({
        message: '[PageHeader] - handleSignoutRequest request',
        data: { result },
      });
    } catch (error) {
      reportCustomError(error);
    }
  };

  const handleAccountDeleteRequest = async () => {
    try {
      const result = (await Auth.deleteUser()) as unknown;
      zConsoleLog({
        message: '[PageHeader] - handleAccountDeleteRequest request',
        data: { result },
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
