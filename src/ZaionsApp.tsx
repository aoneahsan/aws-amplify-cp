import { Auth } from '@aws-amplify/auth';
import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import AppRoutes from './AppRoutes';
import { userAuthRStateAtom } from './RStore';
import { reportCustomError } from './utils/customError';

// Use this to add global listeners etc (where state is needed), if state is not needed then try and prefer "AppEntryPoint.tsx"
const ZaionsApp: React.FC = () => {
  const [userAuthRState, setUserAuthRState] =
    useRecoilState(userAuthRStateAtom);
  const resetUserAuthRState = useResetRecoilState(userAuthRStateAtom);

  useEffect(() => {
    try {
      void (async () => {
        const _userData = (await Auth.currentAuthenticatedUser()) as unknown;
        console.log({ _userData, userAuthRState, setUserAuthRState });
        setUserAuthRState({
          id: 'asdasd',
          firstName: 'ok',
        });
      })();
    } catch (error) {
      reportCustomError({ error });
      resetUserAuthRState();
    }

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AppRoutes />
    </>
  );
};

export default ZaionsApp;
