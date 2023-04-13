import { useContext } from 'react';
import { IonRouterContext } from '@ionic/react';
import {
  emptyVoidReturnFunction,
  showZCapErrorDialogAlert,
} from '@/utils/helpers';

export const useZNavigate = () => {
  try {
    const routerContext = useContext(IonRouterContext);
    const zNavigatePushRoute = (_url: string) => {
      routerContext.push(_url);
    };
    const zNavigateGoBack = () => {
      routerContext.canGoBack() && routerContext.nativeBack();
    };

    return { zNavigateGoBack, zNavigatePushRoute };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => console.error({ err }));
    return {
      zNavigateGoBack: emptyVoidReturnFunction,
      zNavigatePushRoute: emptyVoidReturnFunction,
    };
  }
};
