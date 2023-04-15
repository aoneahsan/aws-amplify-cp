// import { useZIonErrorAlert, useZIonLoading } from '@/ZaionsHooks/zIonic-hooks';
// import { reportCustomError } from '@/utils/customError';
// import { useIonViewWillEnter } from '@ionic/react';
// import { AwsErrorTypeEnum } from '@/utils/enums/aws-amplify';
// import ROUTES from '@/utils/constants/routesConstants';
// import { W_LOCATION } from '@/utils/helpers';
// import { getUserAuthDataFromCurrentUserInfo } from '@/utils/helpers/aws-amplify';
// import { IAwsCurrentUserInfo } from '@/types/AwsAmplify/userData.type';
// import { IUserAuthData } from '@/types/UserTypes';
// import { Auth } from 'aws-amplify';
// import { useZNavigate } from './zRouter-hooks';
// import { useRecoilState } from 'recoil';
// import { userAuthRStateAtom } from '@/RStore';

// export const useZAuthenticate = (deps?: any[] | undefined) => {
//   useIonViewWillEnter(() => {
//     const { presentZIonErrorAlert } = useZIonErrorAlert();
//     const [userAuthState, setUserAuthState] =
//       useRecoilState(userAuthRStateAtom);
//     const { zNavigatePushRoute } = useZNavigate();
//     const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();

//     void (async () => {
//       try {
//         if (!userAuthState?.id) {
//           presentZIonLoader();
//           // setCompState((oldVal) => ({ ...oldVal, processing: true })); // call in onStart

//           const userSessionExists = await Auth.currentSession();
//           if (userSessionExists) {
//             const awsCognitoUserData =
//               (await Auth.currentUserInfo()) as IAwsCurrentUserInfo;
//             const userData: IUserAuthData =
//               getUserAuthDataFromCurrentUserInfo(awsCognitoUserData);

//             setUserAuthState(userData);
//             // setCompState((oldVal) => ({ ...oldVal, processing: false })); // call in onComplete
//             dismissZIonLoader();
//           }
//         }
//       } catch (error) {
//         reportCustomError(error);
//         dismissZIonLoader();
//         // setCompState((oldVal) => ({ ...oldVal, processing: false })); // call in onComplete

//         if (error === AwsErrorTypeEnum.NoCurrentUser) {
//           presentZIonErrorAlert({
//             header: 'No User Found',
//             message: 'Please login to continue to your dashboard',
//             buttons: [
//               {
//                 text: 'Okay',
//                 handler: () => {
//                   zNavigatePushRoute(ROUTES.LOGIN);
//                 },
//               },
//             ],
//           });
//         } else {
//           presentZIonErrorAlert({
//             message:
//               'Something went wrong, please refresh the page and try again!',
//             buttons: [
//               {
//                 text: 'Okay',
//                 handler: () => {
//                   W_LOCATION.REDIRECT_TO_ROOT();
//                 },
//               },
//             ],
//           });
//         }
//       }
//     })();
//     // eslint-disable-next-line
//   }, deps);
// };

export {};
