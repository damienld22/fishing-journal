import React, {useEffect, useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CreateLocationModal from './CreateLocationModal';
import EditLocationModal from './EditLocationModal';
import {getLocations} from '../../requests';
import Snackbar from '../Snackbar';
import LocationItem from './LocationItem';
import {List, CircularProgress} from '@material-ui/core';
import styles from '../components.module.css';

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
		<div className={styles.container}>
			<h1>Zones de pêche</h1>

			<div className={styles.scrollList}>
				<List>
					{
						locations.map(location => (
							<LocationItem key={location._id} location={location} onClick={() => setSelectedLocation(location)} onDeleteDone={getLocationsFromServer}/>
						))
					}
				</List>
			</div>

			<IconButton className={styles.addButton} onClick={() => setCreateLocationModalIsOpen(true)}>
				<AddIcon/>
			</IconButton>

			{ displayProgress && <CircularProgress className={styles.progress}/>}
			{selectedLocation && <EditLocationModal selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>}
			<CreateLocationModal isOpen={createLocationModalIsOpen} setState={setCreateLocationModalIsOpen}/>
			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
		</div>
	);
};

export default Locations;
