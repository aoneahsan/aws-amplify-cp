import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import HomePage from 'pages/Home';
import LoginPage from 'pages/Guest/Login';
import DashboardPage from 'pages/Dashboard';
import ROUTES from 'utils/routesConstants';

const AppRoutes: React.FC = () => (
  <>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path={ROUTES.HOME}>
          <HomePage />
        </Route>
        <Route exact path={ROUTES.LOGIN}>
          <LoginPage />
        </Route>
        <Route exact path={ROUTES.DASHBOARD}>
          <DashboardPage />
        </Route>
        <Route exact path={ROUTES.APP_ROOT}>
          <Redirect to={ROUTES.HOME} />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </>
);

export default AppRoutes;
