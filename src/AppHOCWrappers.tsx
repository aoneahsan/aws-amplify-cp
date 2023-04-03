import { IonApp } from '@ionic/react';
import { RecoilRoot } from 'recoil';
import ZaionsApp from './ZaionsApp';

const AppHOCWrappers: React.FC = () => (
  <>
    <RecoilRoot>
      <IonApp>
        <ZaionsApp />
      </IonApp>
    </RecoilRoot>
  </>
);

export default AppHOCWrappers;
