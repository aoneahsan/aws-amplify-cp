import { IonContent, IonPage, IonTitle } from '@ionic/react';
import classNames from 'classnames';
import PageHeader from 'components/GenericComponents/Header';
import React from 'react';

interface IHomePageProps {
  dummyProp_NOT_NEEDED___ADDED_FOR_DEMO?: string;
}

const HomePage: React.FC<IHomePageProps> = () => {
  return (
    <IonPage>
      <PageHeader pageTitle='Home Page' />
      <IonContent>
        <IonTitle className={classNames('ion-text-center mt-20')}>
          Welcome to AWS Amplify CP App
        </IonTitle>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
