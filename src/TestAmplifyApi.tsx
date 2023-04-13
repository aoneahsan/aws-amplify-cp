import { API, graphqlOperation } from '@aws-amplify/api';
import { Auth, CognitoUser } from '@aws-amplify/auth';
import { Amplify } from '@aws-amplify/core';
import { useIonViewWillEnter } from '@ionic/react';
import { useCallback, useEffect } from 'react';
import { createLead } from './graphql/mutations';
import { listLeads } from './graphql/queries';
import awsConfig from './aws-exports';

Amplify.configure(awsConfig);

const TestAmplifyApi = () => {
  useIonViewWillEnter(() => {
    void checkAuthState();
  });

  const checkAuthState = useCallback(async () => {
    try {
      const result = (await Auth.currentAuthenticatedUser()) as CognitoUser;

      console.log({ call: 'checkAuthState', result });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const loginUser = async () => {
    try {
      const result = (await Auth.signIn(
        'dawnsong99@gmail.com',
        'asdasdasd'
      )) as CognitoUser;

      console.log({ call: 'loginUser', result });
    } catch (error) {
      console.error(error);
    }
  };

  const createLeadHandler = async () => {
    try {
      const result = await API.graphql(
        graphqlOperation(createLead, {
          input: { firstName: 'test', lastName: 'api' },
        })
      );

      console.log({ call: 'createLead', result });
    } catch (error) {
      console.error(error);
    }
  };

  const listLeadsHandler = async () => {
    try {
      const result = await API.graphql(graphqlOperation(listLeads));

      console.log({ call: 'listLeads', result });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='App'>
      <button onClick={() => void checkAuthState()}>checkAuthState</button>
      <button onClick={() => void loginUser()}>loginUser</button>
      <button onClick={() => void createLeadHandler()}>createLead</button>
      <button onClick={() => void listLeadsHandler()}>listLeads</button>
    </div>
  );
};

export default TestAmplifyApi;
