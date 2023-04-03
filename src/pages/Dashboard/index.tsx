import { Auth, CognitoUser } from '@aws-amplify/auth';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonTitle,
} from '@ionic/react';
import classNames from 'classnames';
import PageHeader from '@/components/GenericComponents/Header';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userAuthRStateAtom } from '@/RStore';
import ROUTES from '@/utils/constants/routesConstants';
import { reportCustomError } from '@/utils/customError';
import { AwsErrorTypeEnum } from '@/utils/enums/aws-amplify';
import { W_LOCATION, zConsoleLog } from '@/utils/helpers';
import { useZIonErrorAlert } from '@/ZaionsHooks/zionic-hooks';
import { useZNavigate } from '@/ZaionsHooks/zrouter-hooks';

const DashboardPage: React.FC = () => {
  const { presentZIonErrorAlert, dismissZIonErrorAlert } = useZIonErrorAlert();
  const [userAuthState, setUserAuthState] = useRecoilState(userAuthRStateAtom);
  const { zNavigatePushRoute } = useZNavigate();

  useEffect(() => {
    void (async () => {
      try {
        const userSessionExists = await Auth.currentSession();
        if (userSessionExists) {
          const userData = (await Auth.currentUserInfo()) as CognitoUser;
          zConsoleLog({
            message: '[DashboardPage] - user data, from aws auth package ',
            data: { userData },
          });
          setUserAuthState(userData);
        }
      } catch (error) {
        reportCustomError(error);
        if (error === AwsErrorTypeEnum.NoCurrentUser) {
          console.count('run');
          await presentZIonErrorAlert({
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
          await presentZIonErrorAlert({
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
    })();

    return () => {
      setTimeout(() => {
        void dismissZIonErrorAlert();
      }, 10);
    };
    // eslint-disable-next-line
  }, []);

  zConsoleLog({
    message: '[DashboardPage] - user data from recoil',
    data: { userAuthState },
  });

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
