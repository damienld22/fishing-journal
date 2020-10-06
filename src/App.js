import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import moment from 'moment';
import localization from 'moment/locale/fr';
import {StylesProvider} from '@material-ui/core/styles';
const FishesPage = lazy(() => import('./components/fishes/Fishes'));
const LocationsPage = lazy(() => import('./components/locations/Locations'));
const SessionsPage = lazy(() => import('./components/sessions/Sessions'));
const NavigationBar = lazy(() => import('./components/NavigationBar'));
const DisplaySession = lazy(() => import('./components/sessions/DisplaySession'));

moment.locale('fr', localization);

const App = () => (
	<StylesProvider injectFirst>

		<Router>
			<Suspense fallback={<div>Loading...</div>}>
				<NavigationBar/>
				<Switch>
					<>
						<div style={{padding: 10}}>
							<Route exact path="/fishes">
								<FishesPage/>
							</Route>
							<Route exact path="/locations">
								<LocationsPage/>
							</Route>
							<Route exact path="/sessions">
								<SessionsPage/>
							</Route>
							<Route path="/sessions/:id">
								<DisplaySession/>
							</Route>
							<Route exact path="/">
								<Redirect to="/sessions"/>
							</Route>
						</div>
					</>
				</Switch>
			</Suspense>

		</Router>
	</StylesProvider>
);

export default App;
