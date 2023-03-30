import { IonPage } from '@ionic/react';
import PageHeader from 'components/GenericComponents/Header';
import React from 'react';

interface IHomePageProps {
  dummyProp_NOT_NEEDED___ADDED_FOR_DEMO?: string;
}

const HomePage: React.FC<IHomePageProps> = () => {
  return (
    <IonPage>
      <PageHeader />
    </IonPage>
  );
};

export default HomePage;
