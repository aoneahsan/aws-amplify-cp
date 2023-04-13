import { IonRouterOutlet } from '@ionic/react';
// import { IonReactRouter } from '@ionic/react-router';

import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Guest/Login';
import DashboardPage from '@/pages/Dashboard';
import ROUTES from '@/utils/constants/routesConstants';
import ChangePassword from '@/pages/Guest/ChangePassword';
import RegisterPage from '@/pages/Guest/Register';
import LeadsListPage from '@/pages/Dashboard/Leads';
import CreateLeadPage from '@/pages/Dashboard/Leads/CreateLead';
import ViewLeadPage from '@/pages/Dashboard/Leads/ViewLead';
import { Redirect, Route } from 'react-router';

const AppRoutes: React.FC = () => (
  <>
    {/* <IonReactRouter> */}
    <IonRouterOutlet>
      <Route exact path={ROUTES.HOME}>
        <HomePage />
      </Route>

      {/* Auth Related Screens */}
      <Route exact path={ROUTES.LOGIN}>
        <LoginPage />
      </Route>
      <Route exact path={ROUTES.CHANGE_PASSWORD}>
        <ChangePassword />
      </Route>
      <Route exact path={ROUTES.REGISTER}>
        <RegisterPage />
      </Route>

      {/* User Dashboard Screen */}
      <Route exact path={ROUTES.DASHBOARD}>
        <DashboardPage />
      </Route>
      {/* Leads Pages */}
      <Route exact path={ROUTES.LEADS.LIST}>
        <LeadsListPage />
      </Route>
      <Route exact path={ROUTES.LEADS.CREATE}>
        <CreateLeadPage />
      </Route>
      <Route exact path={ROUTES.LEADS.EDIT}>
        <CreateLeadPage />
      </Route>
      <Route exact path={ROUTES.LEADS.VIEW}>
        <ViewLeadPage />
      </Route>

      {/* Root Screen */}
      <Route exact path={ROUTES.APP_ROOT}>
        <Redirect to={ROUTES.HOME} />
      </Route>
    </IonRouterOutlet>
    {/* </IonReactRouter> */}
  </>
);

export default AppRoutes;
