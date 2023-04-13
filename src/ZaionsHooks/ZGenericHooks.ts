import {
  useZIonToastSuccess,
  useZIonToastDanger,
  useZIonSuccessAlert,
  useZIonErrorAlert,
} from '@/ZaionsHooks/zIonic-hooks';
import { notificationTypeEnum } from '@/utils/enums';
import { reportCustomError } from '@/utils/customError';
import {
  showErrorNotification,
  showSuccessNotification,
} from '@/utils/notification';
import {
  zNotificationInterface,
  zNotificationSlotEnum,
} from '@/types/CustomHooks/zgeneric-hooks.type';

export const useZNotification = () => {
  const { presentZIonToastDanger, dismissZIonToastDanger } =
    useZIonToastDanger();
  const { presentZIonToastSuccess, dismissZIonToastSuccess } =
    useZIonToastSuccess();

  const { presentZIonSuccessAlert } = useZIonSuccessAlert();
  const { presentZIonErrorAlert } = useZIonErrorAlert();

  const presentZNotification = ({
    message,
    notificationType,
    slot,
  }: zNotificationInterface) => {
    try {
      switch (notificationType) {
        case notificationTypeEnum.toast:
          if (slot === zNotificationSlotEnum.error) {
            return presentZIonToastDanger(message);
          } else {
            return presentZIonToastSuccess(message);
          }

        case notificationTypeEnum.sideNotification:
          if (slot === zNotificationSlotEnum.error) {
            return showErrorNotification(message);
          } else {
            return showSuccessNotification(message);
          }

        case notificationTypeEnum.alert:
          if (slot === zNotificationSlotEnum.success) {
            return presentZIonSuccessAlert();
          } else if (slot === zNotificationSlotEnum.error) {
            return presentZIonErrorAlert();
          }
          break;

        default:
          if (slot === zNotificationSlotEnum.error) {
            return presentZIonToastDanger(message);
          } else {
            return presentZIonToastSuccess(message);
          }
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  const dismissZNotificationToast = ({ slot }: zNotificationInterface) => {
    try {
      if (slot === zNotificationSlotEnum.error) {
        return dismissZIonToastDanger();
      } else {
        return dismissZIonToastSuccess();
      }
    } catch (error) {
      reportCustomError(error);
    }
  };

  return { presentZNotification, dismissZNotificationToast };
};
