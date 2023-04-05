import { CognitoUser } from '@aws-amplify/auth';
import { IAwsCurrentUserInfo } from 'types/AwsAmplify/userData.type';
import { ICognitoUserAttribute, IUserAuthData } from 'types/UserTypes';
import { AwsErrorTypeEnum } from 'utils/enums/aws-amplify';

export const checkAndReturnAwsAmplifyErrorType = (
  errorMessage: string,
  errorObj?: unknown
) => {
  if (errorMessage.includes(AwsErrorTypeEnum.UserNotFoundException)) {
    return AwsErrorTypeEnum.UserNotFoundException;
  }

  if (errorMessage.includes(AwsErrorTypeEnum.UsernameExistsException)) {
    return AwsErrorTypeEnum.UsernameExistsException;
  }

  return AwsErrorTypeEnum.UnknownAwsError;
};
export const getUserAuthDataFromCurrentUserInfo = (
  awsCurrentUserInfo: IAwsCurrentUserInfo
): IUserAuthData => {
  const userData: IUserAuthData = {
    id: awsCurrentUserInfo.username,
    email: awsCurrentUserInfo.attributes.email,
    emailIsVerified: awsCurrentUserInfo.attributes.email_verified,
  };

  return userData;
};

export const getUserAuthDataFromCognitoUserObject = async (
  cognitoUserData: CognitoUser
): Promise<IUserAuthData> => {
  return new Promise((res, rej) => {
    const userName = cognitoUserData.getUsername();
    cognitoUserData.getUserAttributes((err, _userAttributes) => {
      if (err) {
        rej(err);
      } else {
        const _attributes = formatAwsUserAttributes(_userAttributes);
        const userData: IUserAuthData = {
          id: userName,
          email: _attributes.email ?? '',
          emailIsVerified: _attributes.emailIsVerified ?? false,
        };

        res(userData);
      }
    });
  });
};

export const formatAwsUserAttributes = (
  attributesArr?: ICognitoUserAttribute[]
) => {
  if (attributesArr && attributesArr.length) {
    const formattedAttributes: {
      email?: string;
      emailIsVerified?: boolean;
    } = {};
    for (let i = 0; i < attributesArr.length; i++) {
      const _attribute = attributesArr[i];
      if (_attribute.Name === 'email') {
        formattedAttributes.email = _attribute.Value;
      }
      if (_attribute.Name === 'email_verified') {
        formattedAttributes.emailIsVerified = Boolean(_attribute.Value);
      }
    }
    return formattedAttributes;
  } else {
    return {};
  }
};
