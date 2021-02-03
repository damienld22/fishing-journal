import React, {lazy, Suspense, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import 'mapbox-gl/dist/mapbox-gl.css';
import moment from 'moment';
import localization from 'moment/locale/fr';
import {StylesProvider} from '@material-ui/core/styles';
import Snackbar from './components/Snackbar';
const FishesPage = lazy(() => import('./components/fishes/Fishes'));
const LocationsPage = lazy(() => import('./components/locations/Locations'));
const SessionsPage = lazy(() => import('./components/sessions/Sessions'));
const NavigationBar = lazy(() => import('./components/NavigationBar'));
const DisplaySession = lazy(() => import('./components/sessions/DisplaySession'));
const ListPage = lazy(() => import('./components/list/List'));
const ReferencesPage = lazy(() => import('./components/references/References'));
const LoginPage = lazy(() => import('./components/authentification/Login'));
const SignUpPage = lazy(() => import('./components/authentification/SignUp'));
const DisplayFish = lazy(() => import('./pages/DisplayFish/DisplayFish'));
const DisplayLocation = lazy(() => import('./pages/DisplayLocation/DisplayLocation'));
const ListStations = lazy(() => import('./pages/ListStations/ListStations'));

moment.locale('fr', localization);

const PrivateRoute = ({component: Component, ...rest}) => (
	<Route
		{...rest} render={props => (
			localStorage.getItem('access_token') ?
				<Component {...props}/> :
				<Redirect to="/login"/>
		)}/>
);

PrivateRoute.propTypes = {
	component: PropTypes.object
};

const App = () => {
	const [connected, setConnected] = useState(Boolean(localStorage.getItem('access_token')));
	const [messageSnackbar, setMessageSnackbar] = useState(null);

	const onAccountCreated = () => {
		setMessageSnackbar('Votre compte est créé, vous pouvez vous connecter');
	};

	return (
		<StylesProvider injectFirst>
			<Router>
				<Suspense fallback={<div>Loading...</div>}>
					<NavigationBar isConnected={connected} onLogout={() => setConnected(false)}/>
					<Switch>
						<>
							<div style={{padding: 10}}>
								<PrivateRoute exact path="/fishes" component={FishesPage}/>
								<PrivateRoute exact path="/fishes/display" component={DisplayFish}/>
								<PrivateRoute exact path="/locations" component={LocationsPage}/>
								<PrivateRoute exact path="/locations/display" component={DisplayLocation}/>
								<PrivateRoute exact path="/sessions" component={SessionsPage}/>
								<PrivateRoute exact path="/sessions/:id" component={DisplaySession}/>
								<PrivateRoute exact path="/list" component={ListPage}/>
								<PrivateRoute exact path="/references" component={ReferencesPage}/>
								<PrivateRoute exact path="/stations/:location" component={ListStations}/>
								<Route exact path="/login">
									<LoginPage onConnection={() => setConnected(true)} onLogout={() => setConnected(false)}/>
								</Route>
								<Route exact path="/sign-up">
									<SignUpPage onAccountCreated={onAccountCreated}/>
								</Route>
								<Route exact path="/">
									{ localStorage.getItem('access_token') ? <Redirect to="/sessions"/> : <Redirect to="/login"/>}
								</Route>
							</div>
						</>
					</Switch>
				</Suspense>

			</Router>

			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
		</StylesProvider>
	);
};

export default App;
