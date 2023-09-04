import { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Home from './pages/Home';
import ViewMessage from './pages/ViewMessage';
import { App } from '@capacitor/app';
import { withRouter } from 'react-router'

const AppCon: React.FC = (props) => {
	useEffect(() => {
		console.log({ t: '[perkforce] - starting adding deeplinks logic', props })
		App.addListener('appUrlOpen', (event) => {
			alert(
				JSON.stringify(
					{ t: '[perkforce] - [result] - App.addListener received, 1', event },
					null,
					2
				)
			);
			console.log({ t: '[perkforce] - [result] - App.addListener received, 1', event });
		});

		App.getLaunchUrl()
			.then((event) => {
				alert(
					JSON.stringify(
						{ t: '[perkforce] - [result] - App.addListener received, 2', event },
						null,
						2
					)
				);
				console.log({ t: '[perkforce] - [result] - App.addListener received, 2', event });
			})
			.catch((error) => {
				alert(
					JSON.stringify(
						{ t: '[perkforce] - [error] - App.addListener received, 3', error },
						null,
						2
					)
				);
				console.log({ t: '[perkforce] - [error] - App.addListener received, 3', error });
			});
	}, []);

	return (
		<>
			<Route path='/' exact={true}>
				<Redirect to='/home' />
			</Route>
			<Route path='/home' exact={true}>
				<Home />
			</Route>
			<Route path='/message/:id'>
				<ViewMessage />
			</Route>
		</>
	);
};

export default withRouter(AppCon);
