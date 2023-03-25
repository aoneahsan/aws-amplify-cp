import AppHOCWrappers from './AppHOCWrappers';

// Use this to add global listeners etc (where state is not needed), if state is needed then use "ZaionsApp.tsx"
const AppEntryPoint: React.FC = () => (
  <>
    <AppHOCWrappers />
  </>
);

export default AppEntryPoint;
