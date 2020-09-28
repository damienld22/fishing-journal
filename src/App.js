import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
const Home = lazy(() => import('./components/Home'));
const FishesPage = lazy(() => import('./components/Fishes'));
const LocationsPage = lazy(() => import('./components/locations/Locations'));
const NavigationBar = lazy(() => import('./components/NavigationBar'));

const App = () => (
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
						<Route exact path="/">
							<Home/>
						</Route>
					</div>
				</>
			</Switch>
		</Suspense>

	</Router>
);

const styles = {
	containerPages: {
		padding: 10
	}
};

export default App;
