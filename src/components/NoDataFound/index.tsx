import { IonButton, IonCol, IonRow, IonText, IonTitle } from '@ionic/react';
import classNames from 'classnames';
import React from 'react';

interface INoDataFoundProps {
  onClick: () => void;
}

const NoDataFound: React.FC<INoDataFoundProps> = ({ onClick }) => {
  return (
    <>
      <IonRow className={classNames('mt-10 ion-justify-content-center')}>
        <IonCol className={classNames('ion-text-center')}>
          <IonTitle className={classNames('ion-text-center')}>
            No Data Found!
          </IonTitle>
          <IonText className={classNames('ion-text-center block mt-2')}>
            Add some data right now!
          </IonText>
          <IonButton
            onClick={onClick}
            className={classNames('inline-block mt-4')}
          >
            Add New Record
          </IonButton>
        </IonCol>
      </IonRow>
    </>
  );
};

export default NoDataFound;
