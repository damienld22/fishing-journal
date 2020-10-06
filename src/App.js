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

moment.locale('fr', localization);

const App = () => (
	<StylesProvider injectFirst>

		<Router>
			<Suspense fallback={<div>Loading...</div>}>
				<NavigationBar/>
				<Switch>
					<>
						<div style={styles.containerPages}>
							<Route path="/fishes">
								<FishesPage/>
							</Route>
							<Route path="/locations">
								<LocationsPage/>
							</Route>
							<Route path="/sessions">
								<SessionsPage/>
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

const styles = {
	containerPages: {
		padding: 10
	}
};

export default App;
