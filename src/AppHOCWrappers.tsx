import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { RecoilRoot } from 'recoil';
import ZaionsApp from './ZaionsApp';

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
