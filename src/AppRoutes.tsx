import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import HomePage from './pages/Home';
import LoginPage from './pages/Guest/Login';
import DashboardPage from './pages/Dashboard';

const AppRoutes: React.FC = () => (
  <>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path='/home'>
          <HomePage />
        </Route>
        <Route exact path='/login'>
          <LoginPage />
        </Route>
        <Route exact path='/dashboard'>
          <DashboardPage />
        </Route>
        <Route exact path='/'>
          <Redirect to='/home' />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </>
);

export default AppRoutes;
