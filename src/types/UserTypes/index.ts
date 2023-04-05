export interface IUserAuthData {
  id: string; // we will user aws cognito user "username" property as id for user row in AppSync/Graphql users Table

  // Fields we will store in AWS AppSync/Graphql
  firstName?: string;
  middleName?: string;
  lastName?: string;
  createdAt?: string;
  updatedAt?: string;

  // Fields we will get from AWS Cognito
  email: string;
  emailIsVerified: boolean;
}
export interface ICognitoUserAttribute {
  Name: string;
  Value: string;
}
