import { appWiseLoaderIsActiveRStateSelector } from '@/RStore';
import { IonButton, IonButtons, IonIcon } from '@ionic/react';
import classNames from 'classnames';
import { eye, pencil, trash } from 'ionicons/icons';
import React from 'react';
import { useRecoilValue } from 'recoil';

interface IActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ActionButtons: React.FC<IActionButtonsProps> = ({
  onView,
  onEdit,
  onDelete,
}) => {
  const appWiseLoaderIsActive = useRecoilValue(
    appWiseLoaderIsActiveRStateSelector
  );

  return (
    <>
      <IonButtons>
        {onView && (
          <IonButton
            fill='solid'
            size='small'
            color={'primary'}
            onClick={onView}
            disabled={appWiseLoaderIsActive}
          >
            {/* {appWiseLoaderIsActive ? (
              <IonSpinner className={classNames('mr-1')} />
            ) : ( */}
            <IonIcon className={classNames('mr-1')} icon={eye} />
            {/* )} */}
            View
          </IonButton>
        )}
        {onEdit && (
          <IonButton
            onClick={onEdit}
            fill='solid'
            size='small'
            color={'warning'}
            disabled={appWiseLoaderIsActive}
          >
            {/* {appWiseLoaderIsActive ? (
              <IonSpinner className={classNames('mr-1')} />
            ) : ( */}
            <IonIcon className={classNames('mr-1')} icon={pencil} />
            {/* )} */}
            Edit
          </IonButton>
        )}
        {onDelete && (
          <IonButton
            onClick={onDelete}
            fill='solid'
            size='small'
            color={'danger'}
            disabled={appWiseLoaderIsActive}
          >
            {/* {appWiseLoaderIsActive ? (
              <IonSpinner className={classNames('mr-1')} />
            ) : ( */}
            <IonIcon className={classNames('mr-1')} icon={trash} />
            {/* )} */}
            Delete
          </IonButton>
        )}
        {!onView &&
          !onEdit &&
          !onDelete &&
          'Pass some Click handler functions to show action buttons.'}
      </IonButtons>
    </>
  );
};
export default ActionButtons;
