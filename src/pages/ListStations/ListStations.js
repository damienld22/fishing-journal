import React, {useEffect, useState} from 'react';
import AddIcon from '@material-ui/icons/Add';
import {CircularProgress, IconButton, List, Snackbar} from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';
import {useHistory, useParams} from 'react-router-dom';
import './ListStations.scss';
import CreateStationModal from '../../components/stations/CreateStationModal';
import {getStationsByLocation} from '../../requests';
import StationItem from '../../components/stations/StationItem';
import EditStationModal from '../../components/stations/EditStationModal';

const ListStations = () => {
	const {location} = useParams();
	const history = useHistory();
	const [stations, setStations] = useState([]);
	const [selectedStation, setSelectedStation] = useState(null);
	const [displayProgress, setDisplayProgress] = useState(false);
	const [messageSnackbar, setMessageSnackbar] = useState(null);
	const [createStationModalIsOpen, setCreateStationModal] = useState(false);

	function getStationsFromServer() {
		getStationsByLocation(location)
			.then(({data}) => {
				setStations(data);
				setDisplayProgress(false);
			})
			.catch(() => {
				setMessageSnackbar('Erreur lors de la récupération des postes.');
				setDisplayProgress(false);
			});
	}

	useEffect(() => {
		if (!createStationModalIsOpen || !selectedStation) {
			setDisplayProgress(true);
			getStationsFromServer();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createStationModalIsOpen, selectedStation]);

	return (
		<div className="container">
			<div className="topLine">
				<IconButton onClick={() => history.goBack()}>
					<BackIcon/>
				</IconButton>
			</div>

			<h1>Zones de pêche</h1>

			<div className="scrollList">
				<List>
					{
						stations.map(station => (
							<StationItem key={station._id} station={station} onClick={() => history.push('/station/display', {station})} onEdit={() => setSelectedStation(station)} onDeleteDone={getStationsFromServer}/>
						))
					}
				</List>
			</div>

			<IconButton className="addButton" onClick={() => setCreateStationModal(true)}>
				<AddIcon/>
			</IconButton>

			{ displayProgress && <CircularProgress className="progress"/>}
			<CreateStationModal isOpen={createStationModalIsOpen} setState={setCreateStationModal} location={location}/>
			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
			{selectedStation && <EditStationModal selectedStation={selectedStation} setSelectedStation={setSelectedStation}/>}
		</div>
	);
};

export default ListStations;
