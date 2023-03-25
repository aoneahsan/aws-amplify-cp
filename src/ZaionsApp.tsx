import AppRoutes from './AppRoutes';

// Use this to add global listeners etc (where state is needed), if state is not needed then try and prefer "AppEntryPoint.tsx"
const ZaionsApp: React.FC = () => (
  <>
    <AppRoutes />
  </>
);

export default ZaionsApp;
