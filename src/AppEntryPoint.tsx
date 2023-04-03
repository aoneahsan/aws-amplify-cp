import AppHOCWrappers from './AppHOCWrappers';
import { setupIonicReact } from '@ionic/react';
import { Amplify } from '@aws-amplify/core';
import AWS_CONFIG from './aws-exports';

import './styles/tailwind.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

Amplify.configure(AWS_CONFIG);

// Use this to add global listeners etc (where state is not needed), if state is needed then use "ZaionsApp.tsx"
const AppEntryPoint: React.FC = () => (
  <>
    <AppHOCWrappers />
  </>
);

export default AppEntryPoint;
