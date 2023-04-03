import { notificationTypeEnum } from '@/utils/enums';

export enum zNotificationSlotEnum {
  success = 'success',
  error = 'error',
}

export interface zNotificationInterface {
  message: string;
  notificationType: notificationTypeEnum;
  slot: zNotificationSlotEnum;
}
