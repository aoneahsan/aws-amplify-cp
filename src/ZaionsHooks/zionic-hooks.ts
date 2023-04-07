import { useZNavigate } from './zRouter-hooks';
import {
  useIonPopover,
  ReactComponentOrElement,
  useIonModal,
  useIonActionSheet,
} from '@ionic/react';
import MESSAGES from 'utils/messages';
import {
  emptyVoidReturnFunction,
  showZCapErrorDialogAlert,
  zConsoleError,
} from 'utils/helpers';
import { NOTIFICATIONS } from 'utils/constants';
import { ZIonColorType } from 'types/zaionsAppSettings.type';
import {
  useZIonAlertPropsType,
  UseZIonAlertReturnType,
  UseZIonAlertSuccessReturnType,
  useZIonErrorAlertReturnType,
  useZIonLoadingReturnType,
  useZIonToastDangerReturnType,
  useZIonToastReturnType,
  useZIonToastSuccessReturnType,
} from 'types/CustomHooks/zionic-hooks.type';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { useSetRecoilState } from 'recoil';
import {
  appWiseIonicAlertRStateAtom,
  appWiseIonicLoaderRStateAtom,
  appWiseIonicToastRStateAtom,
} from 'RStore';
import ROUTES from 'utils/constants/routesConstants';

type GenericComponentType = JSX.Element | ReactComponentOrElement;

/**
 * Alerts
 * custom hook for Alert, success alert and error alert.
 */
/** Default Alert */
export const useZIonAlert = (): UseZIonAlertReturnType => {
  const setAppWiseIonAlertState = useSetRecoilState(
    appWiseIonicAlertRStateAtom
  );
  const dismissIonAlert = () => {
    setTimeout(() => {
      setAppWiseIonAlertState((oldVal) => ({
        ...oldVal,
        showAlert: false,
      }));
    }, 10);
  };

  try {
    const presentZIonAlert = ({
      header = MESSAGES.GENERAL.SUCCESS,
      subHeader = MESSAGES.GENERAL.SUCCESS,
      message = MESSAGES.GENERAL.SUCCESS,
      animated = true,
      keyboardClose = true,
      buttons = [
        {
          text: NOTIFICATIONS.ZIonAlerts.OKAY_BUTTON.TEXT,
          role: NOTIFICATIONS.ZIonAlerts.OKAY_BUTTON.ROLE,
        },
      ],
      alertId,
    }: useZIonAlertPropsType): void => {
      setAppWiseIonAlertState((oldVal) => ({
        ...oldVal,
        showAlert: false,
      }));

      setTimeout(() => {
        setAppWiseIonAlertState((oldVal) => ({
          ...oldVal,
          showAlert: true,
          alertProps: {
            ...oldVal.alertProps,
            header,
            subHeader,
            message,
            buttons,
            id: alertId,
            animated,
            keyboardClose,
          },
        }));
      }, 0);
    };
    return { presentZIonAlert, dismissIonAlert };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => zConsoleError({ err }));
    return { presentZIonAlert: emptyVoidReturnFunction, dismissIonAlert };
  }
};

/** Success Alert */
export const useZIonSuccessAlert = (): UseZIonAlertSuccessReturnType => {
  const { dismissIonAlert, presentZIonAlert } = useZIonAlert();
  try {
    const presentZIonSuccessAlert = (
      props: useZIonAlertPropsType = {}
    ): void => {
      const {
        header = MESSAGES.GENERAL.SUCCESS,
        subHeader = MESSAGES.GENERAL.SUCCESS_SUBHEADING,
        message = MESSAGES.GENERAL.SUCCESS_MESSAGE,
        buttons,
      } = props;
      presentZIonAlert({
        header,
        subHeader,
        message,
        buttons,
      });
    };
    return {
      presentZIonSuccessAlert,
      dismissZIonSuccessAlert: dismissIonAlert,
    };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => zConsoleError({ err }));
    return {
      presentZIonSuccessAlert: emptyVoidReturnFunction,
      dismissZIonSuccessAlert: emptyVoidReturnFunction,
    };
  }
};

/** Error Alert */
export const useZIonErrorAlert = () => {
  const { presentZIonAlert, dismissIonAlert } = useZIonAlert();
  const { zNavigatePushRoute } = useZNavigate();
  try {
    const presentZIonErrorAlert = (props: useZIonAlertPropsType = {}): void => {
      const {
        header = MESSAGES.GENERAL.FAILED,
        subHeader = MESSAGES.GENERAL.FAILED_SUBHEADING,
        message = MESSAGES.GENERAL.FAILED_MESSAGE,
        buttons,
      } = props;
      presentZIonAlert({
        header,
        subHeader,
        message,
        buttons,
      });
    };
    const presentZIonUnAuthAlert = (
      props: useZIonAlertPropsType = {}
    ): void => {
      const {
        header = MESSAGES.GENERAL.UNAUTHENTICATED,
        subHeader = MESSAGES.GENERAL.UNAUTHENTICATED,
        message = MESSAGES.GENERAL.UNAUTHENTICATED,
        buttons = [
          {
            text: 'Login',
            handler: () => {
              zNavigatePushRoute(ROUTES.LOGIN);
            },
          },
        ],
      } = props;
      presentZIonAlert({
        header,
        subHeader,
        message,
        buttons,
      });
    };
    return {
      presentZIonErrorAlert,
      dismissZIonErrorAlert: dismissIonAlert,
      presentZIonUnAuthAlert,
    };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => zConsoleError({ err }));
    return {
      presentZIonErrorAlert: emptyVoidReturnFunction,
      dismissZIonErrorAlert: emptyVoidReturnFunction,
      presentZIonUnAuthAlert: emptyVoidReturnFunction,
    };
  }
};

/**
 * Loading
 * custom hook for Loading.
 */
/** Ionic Loader */
export const useZIonLoading = (id?: string): useZIonLoadingReturnType => {
  const setAppWiseIonLoaderState = useSetRecoilState(
    appWiseIonicLoaderRStateAtom
  );
  try {
    const dismissZIonLoader = () => {
      setTimeout(() => {
        setAppWiseIonLoaderState((oldVal) => ({
          ...oldVal,
          showLoader: false,
        }));
      }, 10);
    };
    const presentZIonLoader = (message?: string): void => {
      setAppWiseIonLoaderState((oldVal) => ({
        ...oldVal,
        showLoader: false,
      }));

      setTimeout(() => {
        setAppWiseIonLoaderState((oldVal) => ({
          ...oldVal,
          showLoader: true,
          loaderProps: {
            message: message,
          },
        }));
      }, 0);
    };
    return { presentZIonLoader, dismissZIonLoader };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => zConsoleError({ err }));
    return {
      presentZIonLoader: emptyVoidReturnFunction,
      dismissZIonLoader: emptyVoidReturnFunction,
    };
  }
};

/**
 * Toast
 * custom hook for toast, success toast and error or danger toast.
 */
/** Ionic Toast */
export const useZIonToast = (): useZIonToastReturnType => {
  const setAppWiseIonToastState = useSetRecoilState(
    appWiseIonicToastRStateAtom
  );
  try {
    const dismissZionToast = () => {
      setTimeout(() => {
        setAppWiseIonToastState((oldVal) => ({
          ...oldVal,
          showToast: false,
        }));
      }, 10);
    };
    const presentZIonToast = (
      message?: string,
      color?: ZIonColorType
    ): void => {
      setAppWiseIonToastState((oldVal) => ({
        ...oldVal,
        showToast: false,
      }));

      setTimeout(() => {
        setAppWiseIonToastState((oldVal) => ({
          ...oldVal,
          showToast: true,
          toastProps: {
            message,
            color,
          },
        }));
      }, 0);
    };
    return { presentZIonToast, dismissZionToast };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => zConsoleError({ err }));
    return {
      presentZIonToast: emptyVoidReturnFunction,
      dismissZionToast: emptyVoidReturnFunction,
    };
  }
};

/** Ionic danger Toast */
export const useZIonToastDanger = (): useZIonToastDangerReturnType => {
  const { presentZIonToast, dismissZionToast: dismissZIonToastDanger } =
    useZIonToast();
  try {
    const presentZIonToastDanger = (message?: string): void => {
      presentZIonToast(message || MESSAGES.GENERAL.FAILED, 'danger');
    };
    return { presentZIonToastDanger, dismissZIonToastDanger };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => zConsoleError({ err }));
    return {
      presentZIonToastDanger: emptyVoidReturnFunction,
      dismissZIonToastDanger: emptyVoidReturnFunction,
    };
  }
};

/** Ionic success Toast */
export const useZIonToastSuccess = (): useZIonToastSuccessReturnType => {
  const { presentZIonToast, dismissZionToast: dismissZIonToastSuccess } =
    useZIonToast();
  try {
    const presentZIonToastSuccess = (message?: string): void => {
      presentZIonToast(message || MESSAGES.GENERAL.FAILED, 'success');
    };
    return { presentZIonToastSuccess, dismissZIonToastSuccess };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => zConsoleError({ err }));
    return {
      presentZIonToastSuccess: emptyVoidReturnFunction,
      dismissZIonToastSuccess: emptyVoidReturnFunction,
    };
  }
};

/**
 * Popover
 * custom hook for Popover.
 */
export const useZIonPopover = <A extends object>(
  component: GenericComponentType,
  componentProps?: A
): {
  presentZIonPopover: <B extends Event>({
    _event,
    _cssClass,
    _dismissOnSelect,
  }: {
    _event: B;
    _cssClass?: string | string[] | undefined;
    _dismissOnSelect?: boolean;
  }) => void;
  dismissZIonPopover: (data?: unknown, role?: string | undefined) => void;
} => {
  const { zNavigatePushRoute } = useZNavigate();
  const [presentIonPopover, dismissZIonPopover] = useIonPopover(component, {
    zNavigatePushRoute,
    dismissZIonPopover: (data: string, role: string) =>
      dismissZIonPopover(data, role),
    ...componentProps,
  });
  try {
    const presentZIonPopover = <B extends Event>({
      _event,
      _cssClass,
      _dismissOnSelect = true,
    }: {
      _event: B;
      _cssClass?: string | string[];
      _dismissOnSelect?: boolean;
    }): void => {
      presentIonPopover({
        event: _event,
        keyboardClose: true,
        dismissOnSelect: _dismissOnSelect,
        showBackdrop: false,
        alignment: 'start',
        side: 'bottom',
        cssClass: _cssClass,
      });
    };
    return { presentZIonPopover, dismissZIonPopover };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => zConsoleError({ err }));
  }
  return {
    presentZIonPopover: emptyVoidReturnFunction,
    dismissZIonPopover: emptyVoidReturnFunction,
  };
};

/**
 * Modal
 * custom hook for Modal.
 */
export const useZIonModal = <A extends object>(
  component: GenericComponentType,
  componentProps?: A
): {
  presentZIonModal: ({
    _cssClass,
    _onWillDismiss,
  }: {
    _cssClass?: string | string[];
    _onWillDismiss?: (event: CustomEvent<OverlayEventDetail<unknown>>) => void;
  }) => void | void;
  dismissZIonModal: (data?: unknown, role?: string | undefined) => void | void;
} => {
  const { zNavigatePushRoute } = useZNavigate();
  const [presentIonModal, dismissZIonModal] = useIonModal(component, {
    dismissZIonModal: (data: string, role: string) =>
      dismissZIonModal(data, role),
    zNavigatePushRoute,
    ...componentProps,
  });
  try {
    const presentZIonModal = ({
      _cssClass,
      _onWillDismiss,
    }: {
      _cssClass?: string | string[];
      _onWillDismiss?: (
        event: CustomEvent<OverlayEventDetail<unknown>>
      ) => void;
    }): void => {
      presentIonModal({
        cssClass: _cssClass,
        onWillDismiss: _onWillDismiss,
      });
    };
    return { presentZIonModal, dismissZIonModal };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => zConsoleError({ err }));

    return {
      presentZIonModal: emptyVoidReturnFunction,
      dismissZIonModal: emptyVoidReturnFunction,
    };
  }
};

/**
 * Modal
 * custom hook for Modal.
 */
export const useZIonActionSheet = () => {
  const [presentIonActionSheet] = useIonActionSheet();
  try {
    const presentZIonActionSheet = presentIonActionSheet;
    return { presentZIonActionSheet };
  } catch (error) {
    showZCapErrorDialogAlert()
      .then()
      .catch((err: Error) => zConsoleError({ err }));

    return {
      presentZIonActionSheet: emptyVoidReturnFunction,
    };
  }
};
