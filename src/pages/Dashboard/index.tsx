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
import PageHeader from 'components/GenericComponents/Header';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userAuthRStateAtom } from 'RStore';
import { zConsoleLog } from 'utils/helpers';
import { useZIonErrorAlert } from 'ZaionsHooks/zionic-hooks';
import { IUserAuthData } from 'types/UserTypes';

interface IDashboardPageProps {
  dummyProp_NOT_NEEDED___ADDED_FOR_DEMO?: string;
}

const DashboardPage: React.FC<IDashboardPageProps> = () => {
  const { presentZIonErrorAlert } = useZIonErrorAlert();
  const [userAuthState, setUserAuthState] = useRecoilState(userAuthRStateAtom);

  useEffect(() => {
    void (async () => {
      try {
        const userData = (await Auth.currentAuthenticatedUser()) as CognitoUser;
        zConsoleLog({ message: 'user data ', data: { userData } });
        const _userAuthData: IUserAuthData = { id: 'asd' };

        zConsoleLog({ message: 'user data', data: { _userAuthData } });
        setUserAuthState(_userAuthData);
      } catch (error) {
        await presentZIonErrorAlert();
      }
    })();

    // eslint-disable-next-line
  }, []);

  zConsoleLog({ message: 'user data from recoil', data: { userAuthState } });

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

export default DashboardPage;
