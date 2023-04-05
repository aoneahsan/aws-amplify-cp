import { IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import React from 'react';
import { add, chevronUp } from 'ionicons/icons';
import { useZNavigate } from 'ZaionsHooks/zrouter-hooks';
import ROUTES, { ROUTES_ARRAY } from 'utils/constants/routesConstants';
import { useZIonErrorAlert } from 'ZaionsHooks/zionic-hooks';

interface IQuickActionsProps {
  dummyProp_NOT_NEEDED___ADDED_FOR_DEMO?: string;
}

const QuickActions: React.FC<IQuickActionsProps> = () => {
  const { zNavigatePushRoute } = useZNavigate();
  const { presentZIonErrorAlert } = useZIonErrorAlert();

  const handleNavigateAction = (path: string) => {
    if (path && ROUTES_ARRAY.includes(path)) {
      zNavigatePushRoute(path);
    } else {
      presentZIonErrorAlert({ message: 'Invalid request, route not found!' });
    }
  };
  return (
    <>
      <IonFab slot='fixed' horizontal='center' vertical='center'>
        <IonFabButton>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
        <IonFabList side='top'>
          <IonFabButton>
            <IonIcon
              icon={chevronUp}
              onClick={() => handleNavigateAction(ROUTES.LEADS.LIST)}
            ></IonIcon>
          </IonFabButton>
        </IonFabList>
        {/* <IonFabList side='end'>
          <IonFabButton>
            <IonIcon icon={chevronForward}></IonIcon>
          </IonFabButton>
          <IonFabButton>
            <IonIcon icon={chevronForward}></IonIcon>
          </IonFabButton>
        </IonFabList>
        <IonFabList side='bottom'>
          <IonFabButton>
            <IonIcon icon={chevronDown}></IonIcon>
          </IonFabButton>
        </IonFabList>
        <IonFabList side='start'>
          <IonFabButton>
            <IonIcon icon={chevronBack}></IonIcon>
          </IonFabButton>
          <IonFabButton>
            <IonIcon icon={chevronBack}></IonIcon>
          </IonFabButton>
        </IonFabList> */}
      </IonFab>
    </>
  );
};

export default QuickActions;
