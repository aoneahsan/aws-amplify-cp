import { IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import React, { useCallback } from 'react';
import { add, chevronUp, eye } from 'ionicons/icons';
import { useZNavigate } from '@/ZaionsHooks/zRouter-hooks';
import ROUTES from '@/utils/constants/routesConstants';
import * as zionicHooks from '@/ZaionsHooks/zIonic-hooks';
import { getObjValuesAsArrayOfStrings } from '@/utils/helpers';

interface IQuickActionsProps {
  dummyProp_NOT_NEEDED___ADDED_FOR_DEMO?: string;
}

const QuickActions: React.FC<IQuickActionsProps> = () => {
  const { zNavigatePushRoute } = useZNavigate();
  const { presentZIonErrorAlert } = zionicHooks.useZIonErrorAlert();

  const handleNavigateAction = useCallback((path: string) => {
    if (path && getObjValuesAsArrayOfStrings(ROUTES).includes(path)) {
      zNavigatePushRoute(path);
    } else {
      presentZIonErrorAlert({ message: 'Invalid request, route not found!' });
    }
  }, []);
  return (
    <>
      <IonFab slot='fixed' horizontal='end' vertical='bottom'>
        <IonFabButton>
          <IonIcon icon={chevronUp}></IonIcon>
        </IonFabButton>
        <IonFabList side='top'>
          <IonFabButton
            onClick={() => handleNavigateAction(ROUTES.LEADS.CREATE)}
          >
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
          <IonFabButton onClick={() => handleNavigateAction(ROUTES.LEADS.LIST)}>
            <IonIcon icon={eye}></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </>
  );
};

export default QuickActions;
