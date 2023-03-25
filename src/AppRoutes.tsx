import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

const AppRoutes: React.FC = () => (
  <>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path='/home'>
          <Home />
        </Route>
        <Route exact path='/'>
          <Redirect to='/home' />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </>
);

export default AppRoutes;
