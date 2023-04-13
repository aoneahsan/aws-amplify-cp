import { AlertButton } from '@ionic/react';
import { VoidReturn } from '@/types/Generic';
import { ZIonColorType } from '@/types/zaionsAppSettings.type';

/**
 * types for ionic custom Alert hooks
 */
export type useZIonAlertPropsType = {
  header?: string;
  subHeader?: string;
  message?: string;
  animated?: boolean;
  keyboardClose?: boolean;
  buttons?: (string | AlertButton)[];
  alertId?: string;
};

export type UseZIonAlertReturnCustomType = (
  input: useZIonAlertPropsType
) => VoidReturn;

export type UseZIonAlertReturnType = {
  presentZIonAlert: (input: useZIonAlertPropsType) => VoidReturn;
  dismissIonAlert: () => VoidReturn;
};

export type UseZIonAlertSuccessReturnType = {
  presentZIonSuccessAlert: (input?: useZIonAlertPropsType) => VoidReturn;
  dismissZIonSuccessAlert: () => VoidReturn;
};

export type useZIonErrorAlertReturnType = {
  presentZIonErrorAlert: (input?: useZIonAlertPropsType) => VoidReturn;
  dismissZIonErrorAlert: () => VoidReturn;
  presentZIonUnAuthAlert: (input?: useZIonAlertPropsType) => VoidReturn;
};

/**
 * types for ionic custom Loading hooks
 */
type useZIonLoadingPresentReturnType = (message?: string) => VoidReturn;

type useZIonLoadingDismissReturnType = () => VoidReturn;

export type useZIonLoadingReturnType = {
  presentZIonLoader: useZIonLoadingPresentReturnType;
  dismissZIonLoader: useZIonLoadingDismissReturnType;
};

/**
 * types for ionic custom Toast hooks
 */
type useZIonToastPresentReturnType = (
  message?: string,
  color?: ZIonColorType
) => VoidReturn;

type useZIonToastDismissReturnType = () => VoidReturn;

export type useZIonToastReturnType = {
  presentZIonToast: useZIonToastPresentReturnType;
  dismissZionToast: useZIonToastDismissReturnType;
};

export type useZIonToastDangerReturnType = {
  presentZIonToastDanger: useZIonToastPresentReturnType;
  dismissZIonToastDanger: useZIonToastDismissReturnType;
};

export type useZIonToastSuccessReturnType = {
  presentZIonToastSuccess: useZIonToastPresentReturnType;
  dismissZIonToastSuccess: useZIonToastDismissReturnType;
};
