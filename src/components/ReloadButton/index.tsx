import { appWiseLoaderIsActiveRStateSelector } from '@/RStore';
import { IonButton, IonIcon, IonSpinner } from '@ionic/react';
import classNames from 'classnames';
import { reload } from 'ionicons/icons';
import React from 'react';
import { useRecoilValue } from 'recoil';

interface IReloadButtonProps {
  onClick: () => void;
}

const ReloadButton: React.FC<IReloadButtonProps> = ({ onClick }) => {
  const appWiseLoaderIsActive = useRecoilValue(
    appWiseLoaderIsActiveRStateSelector
  );

  return (
    <IonButton onClick={onClick} disabled={appWiseLoaderIsActive}>
      {appWiseLoaderIsActive ? (
        <IonSpinner className={classNames('mr-2')} />
      ) : (
        <IonIcon icon={reload} className={classNames('mr-2')} />
      )}
      Reload Data
    </IonButton>
  );
};
export default ReloadButton;
