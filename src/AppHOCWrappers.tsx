import { IonApp } from '@ionic/react';
import { RecoilRoot } from 'recoil';
import ZaionsApp from '@/ZaionsApp';
import { IonReactRouter } from '@ionic/react-router';

const AppHOCWrappers: React.FC = () => (
  <>
    <RecoilRoot>
      <IonApp>
        <IonReactRouter>
          <ZaionsApp />
        </IonReactRouter>
      </IonApp>
    </RecoilRoot>
  </>
);

export default AppHOCWrappers;
