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

interface IPageHeaderProps {
  pageTitle?: string;
}

const PageHeader: React.FC<IPageHeaderProps> = ({
  pageTitle = 'AWS Amplify CP',
}) => {
  return (
    <>
      <IonHeader>
        <IonToolbar className={classNames('ok')}>
          <IonMenuToggle slot='start' />
          <IonTitle slot='start'>{pageTitle}</IonTitle>
          <IonButtons slot='end'>
            <IonButton color='primary' fill='solid'>
              SignIn
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default PageHeader;
