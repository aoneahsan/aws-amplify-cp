import { IonCard, IonCol, IonGrid, IonRow } from '@ionic/react';
import classNames from 'classnames';
import React, { ReactNode } from 'react';

interface IPageCenterCardContainerProps {
  children: ReactNode;
}

const PageCenterCardContainer: React.FC<IPageCenterCardContainerProps> = ({
  children,
}) => {
  return (
    <IonGrid className={classNames('mt-10')}>
      <IonRow>
        <IonCol
          size='11'
          offset='.5'
          sizeMd='9'
          offsetMd='1.5'
          sizeLg='6'
          offsetLg='3'
          sizeXl='5'
          offsetXl='3.3'
        >
          <IonCard className={classNames('p-10')}>{children}</IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default PageCenterCardContainer;
