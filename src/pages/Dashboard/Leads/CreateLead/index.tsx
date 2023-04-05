import { IonPage } from '@ionic/react';
import PageHeader from 'components/GenericComponents/Header';
import React from 'react';

interface ICreateLeadPageProps {
  dummyProp_NOT_NEEDED___ADDED_FOR_DEMO?: string;
}

const CreateLeadPage: React.FC<ICreateLeadPageProps> = () => {
  return (
    <>
      <IonPage>
        <PageHeader pageTitle='Create New Lead' />
      </IonPage>
    </>
  );
};

export default CreateLeadPage;
