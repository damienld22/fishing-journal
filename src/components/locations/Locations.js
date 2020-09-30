import React, {useEffect, useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CreateLocationModal from './CreateLocationModal';
import EditLocationModal from './EditLocationModal';
import {getLocations} from '../../requests';
import Snackbar from '../Snackbar';
import LocationItem from './LocationItem';
import {List, Paper, CircularProgress} from '@material-ui/core';

const Locations = () => {
	const [createLocationModalIsOpen, setCreateLocationModalIsOpen] = useState(false);
	const [locations, setLocations] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [displayProgress, setDisplayProgress] = useState(false);
	const [messageSnackbar, setMessageSnackbar] = useState(null);

	function getLocationsFromServer() {
		getLocations()
			.then(({data}) => {
				setLocations(data);
				setDisplayProgress(false);
			})
			.catch(() => {
				setMessageSnackbar('Erreur lors de la récupération des plans / cours d\'eau.');
				setDisplayProgress(false);
			});
	}

	useEffect(() => {
		if (!createLocationModalIsOpen || !selectedLocation) {
			setDisplayProgress(true);
			getLocationsFromServer();
		}
	}, [createLocationModalIsOpen, selectedLocation]);

	return (
		<div style={styles.container}>
			<h1>Zones de pêche</h1>

			<Paper style={styles.scrollList}>
				<List>
					{
						locations.map(location => (
							<LocationItem key={location._id} location={location} onClick={() => setSelectedLocation(location)} onDeleteDone={getLocationsFromServer}/>
						))
					}
				</List>
			</Paper>

			<IconButton style={styles.addButton} onClick={() => setCreateLocationModalIsOpen(true)}>
				<AddIcon/>
			</IconButton>

			{ displayProgress && <CircularProgress style={styles.progress}/>}
			{selectedLocation && <EditLocationModal selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>}
			<CreateLocationModal isOpen={createLocationModalIsOpen} setState={setCreateLocationModalIsOpen}/>
			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
		</div>
	);
};

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	scrollList: {
		minHeight: '75vh',
		maxHeight: '75vh',
		width: '100%',
		overflow: 'auto'
	},
	progress: {
		position: 'absolute',
		left: 'calc(50% - 20px)',
		top: '50%'
	},
	addButton: {
		position: 'absolute',
		bottom: '10%',
		right: '10%',
		backgroundColor: 'blue',
		color: 'white'
	}
};

export default Locations;
