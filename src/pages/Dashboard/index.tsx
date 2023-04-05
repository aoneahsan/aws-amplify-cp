import { API, graphqlOperation, GraphQLResult } from '@aws-amplify/api';
import { Auth } from '@aws-amplify/auth';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonTitle,
} from '@ionic/react';
import { GetUserQuery } from 'API';
import classNames from 'classnames';
import PageHeader from 'components/GenericComponents/Header';
import { getUser } from 'graphql/queries';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userAuthRStateAtom } from 'RStore';
import { IAwsCurrentUserInfo } from 'types/AwsAmplify/userData.type';
import { IUserAuthData } from 'types/UserTypes';
import ROUTES from 'utils/constants/routesConstants';
import { reportCustomError } from 'utils/customError';
import { AwsErrorTypeEnum } from 'utils/enums/aws-amplify';
import { W_LOCATION, zConsoleLog } from 'utils/helpers';
import { getUserAuthDataFromCurrentUserInfo } from 'utils/helpers/aws-amplify';
import { useZIonErrorAlert, useZIonLoading } from 'ZaionsHooks/zionic-hooks';
import { useZNavigate } from 'ZaionsHooks/zrouter-hooks';

const DashboardPage: React.FC = () => {
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const [userAuthState, setUserAuthState] = useRecoilState(userAuthRStateAtom);
  const { zNavigatePushRoute } = useZNavigate();
  const { presentZIonLoader, dismissZIonLoader } = useZIonLoading();

  useEffect(() => {
    void (async () => {
      presentZIonLoader();

      try {
        const userSessionExists = await Auth.currentSession();
        if (userSessionExists) {
          const awsCognitoUserData =
            (await Auth.currentUserInfo()) as IAwsCurrentUserInfo;
          const userData: IUserAuthData =
            getUserAuthDataFromCurrentUserInfo(awsCognitoUserData);

          const { data: { getUser: _userInfoFromAwsAppSync } = {} } =
            (await API.graphql(
              graphqlOperation(getUser, { id: userData.id })
            )) as GraphQLResult<GetUserQuery>;

          zConsoleLog({
            message: '[DashboardPage] - user data, from aws auth package ',
            data: { userData, _userInfoFromAwsAppSync },
          });

          setUserAuthState(userData);
        }
      } catch (error) {
        reportCustomError(error);
        dismissZIonLoader();

        if (error === AwsErrorTypeEnum.NoCurrentUser) {
          presentZIonErrorAlert({
            header: 'No User Found',
            message: 'Please login to continue to your dashboard',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  zNavigatePushRoute(ROUTES.LOGIN);
                },
              },
            ],
          });
        } else {
          presentZIonErrorAlert({
            message:
              'Something went wrong, please refresh the page and try again!',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  W_LOCATION.REDIRECT_TO_ROOT();
                },
              },
            ],
          });
        }
      }
      dismissZIonLoader();
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!userAuthState || !userAuthState.id) {
      zNavigatePushRoute(ROUTES.HOME);
    }

    // eslint-disable-next-line
  }, [userAuthState]);

  return (
    <IonPage>
      <PageHeader pageTitle='Dashboard' />
      <IonContent>
        <IonGrid className={classNames('mt-10')}>
          <IonRow>
            <IonCol
              size='11'
              offset='.5'
              sizeMd='9'
              offsetMd='1.5'
              sizeLg='6'
              offsetLg='3'
              sizeXl='5'
              offsetXl='3.3'
            >
              <IonTitle>Welcome to your dashboard</IonTitle>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(DashboardPage);
