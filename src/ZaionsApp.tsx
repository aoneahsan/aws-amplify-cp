import { Auth, CognitoUser } from '@aws-amplify/auth';
import { useEffect } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { zConsoleLog } from 'utils/helpers';
import AppRoutes from './AppRoutes';
import { userAuthRStateAtom } from './RStore';
import { reportCustomError } from './utils/customError';

// Use this to add global listeners etc (where state is needed), if state is not needed then try and prefer "AppEntryPoint.tsx"
const ZaionsApp: React.FC = () => {
  const setUserAuthRState = useSetRecoilState(userAuthRStateAtom);
  const resetUserAuthRState = useResetRecoilState(userAuthRStateAtom);

  useEffect(() => {
    try {
      void (async () => {
        const _userData = (await Auth.currentUserInfo()) as CognitoUser;
        zConsoleLog({
          message: '[ZaionsApp] - setting userdata is available in recoil',
          data: { _userData },
        });
        setUserAuthRState(_userData);
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
