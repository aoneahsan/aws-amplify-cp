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
import { isAuthenticatedRStateSelector } from 'RStore';
import ROUTES from 'utils/constants/routesConstants';

const DEFAULT_TITLE = 'AWS Amplify CP';

interface IPageHeaderProps {
  pageTitle?: string;
}

const PageHeader: React.FC<IPageHeaderProps> = ({ pageTitle }) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedRStateSelector);

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
              <IonButton
                color='primary'
                fill='solid'
                routerLink={ROUTES.DASHBOARD}
              >
                Dashboard
              </IonButton>
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
