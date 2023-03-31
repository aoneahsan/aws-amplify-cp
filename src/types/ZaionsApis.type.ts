import { ZGenericObject } from './zaionsAppSettings.type';

// Enum's
export enum ZIonModalActionEnum {
  success = 'success',
}

export type AxiosRequestResponseType = {
  data: unknown;
};

export type ZLinkMutateApiType<T> = {
  data: { item: T };
  errors: ZGenericObject;
  message: string;
  status: number;
  success: boolean;
};
