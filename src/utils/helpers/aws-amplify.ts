import { AwsErrorTypeEnum } from '@/utils/enums/aws-amplify';

export const checkAndReturnAwsAmplifyErrorType = (
  errorMessage: string,
  errorObj?: unknown
) => {
  if (errorMessage.includes(AwsErrorTypeEnum.UserNotFoundException)) {
    return AwsErrorTypeEnum.UserNotFoundException;
  }

  return AwsErrorTypeEnum.UnknownAwsError;
};
