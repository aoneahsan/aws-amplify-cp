import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItemDivider,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Home.css';
import { atom, selectorFamily, useRecoilState, useRecoilValue } from 'recoil';
import { Suspense } from 'react';

const userIdState = atom<number | undefined>({
  key: 'userId',
  default: undefined,
});

type UserDataType = { name: string; phone: string };

const userDataSelectorFamily = selectorFamily<
  UserDataType | null,
  number | undefined
>({
  key: 'userDataSelectorFamily_key',
  get:
    (userIdPassed) =>
    async ({ get }) => {
      const userId = get(userIdState);
      console.log({ userIdPassed, userId });
      if (!userIdPassed) return null;

      const result = (await fetch(
        `https://jsonplaceholder.typicode.com/users/${userIdPassed}`
      ).then((res) => res.json())) as UserDataType;

      return result;
    },
});

const UserDataComp = ({ userId }: { userId: number }) => {
  const userData = useRecoilValue(userDataSelectorFamily(userId));
  return (
    <>
      {userId !== undefined && userData && (
        <IonGrid>
          <IonRow>
            <IonCol size='6'>
              <IonTitle>User data:</IonTitle>
              <IonText>
                <b>Name:</b> {userData.name}
              </IonText>
            </IonCol>
            <IonCol size='6'>
              <IonText>
                <b>Phone:</b> {userData.phone}
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      )}
    </>
  );
};

const Home: React.FC = () => {
  const [userId, setUserId] = useRecoilState(userIdState);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonText>testing</IonText>
        <IonTitle>View Profile</IonTitle>
        <IonText>Choose a user:</IonText>
        <IonSelect
          placeholder='Choose a user'
          value={userId}
          onIonChange={(event) => {
            console.dir({ event });
            if (event.detail && event.detail.value) {
              if (typeof event.detail.value === 'number') {
                const value = event.detail.value;
                setUserId(value);
              }
            }
          }}
          itemType='number'
        >
          <IonSelectOption value={1}>User 1</IonSelectOption>
          <IonSelectOption value={2}>User 2</IonSelectOption>
          <IonSelectOption value={3}>User 3</IonSelectOption>
        </IonSelect>
        <IonItemDivider />
        <Suspense fallback={<>Loading...</>}>
          {userId && <UserDataComp userId={userId} />}
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default Home;
