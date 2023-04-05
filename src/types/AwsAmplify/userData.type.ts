export interface IAwsCurrentUserInfo {
  id: string;
  username: string;
  attributes: {
    email: string;
    email_verified: boolean;
    sub: string;
  };
}
