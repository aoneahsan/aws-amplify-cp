import { API, graphqlOperation } from '@aws-amplify/api';
import { Auth } from '@aws-amplify/auth';
import { Amplify } from '@aws-amplify/core';
import React from 'react';
import './App.css';
import awsConfig from './aws-exports'
import { createLead } from './graphql/mutations';
import { listLeads } from './graphql/queries';

Amplify.configure(awsConfig);

function App() {
	const checkAuthState = async () => {
		try {
			const result = await Auth.currentAuthenticatedUser();

			console.log({ call: 'checkAuthState', result });
		} catch (error) {
			console.error(error);
		}
	};

	const loginUser = async () => {
		try {
			const result = await Auth.signIn('dawnsong99@gmail.com', 'asdasdasd');

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
			<button onClick={checkAuthState}>checkAuthState</button>
			<button onClick={loginUser}>loginUser</button>
			<button onClick={createLeadHandler}>createLead</button>
			<button onClick={listLeadsHandler}>listLeads</button>
		</div>
	);
}

export default App;
