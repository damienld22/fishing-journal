import React, {useState} from 'react';
import AddIcon from '@material-ui/icons/Add';
import {IconButton} from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';
import {useHistory, useParams} from 'react-router-dom';
import './ListStations.scss';
import CreateStationModal from '../../components/stations/CreateStationModal';

const ListStations = () => {
	const {location} = useParams();
	const history = useHistory();
	const [createStationModalIsOpen, setCreateStationModal] = useState(false);

	return (
		<div className="container">
			<div className="topLine">
				<IconButton onClick={() => history.goBack()}>
					<BackIcon/>
				</IconButton>
			</div>

			<p>{location}</p>

			<IconButton className="addButton" onClick={() => setCreateStationModal(true)}>
				<AddIcon/>
			</IconButton>

			<CreateStationModal isOpen={createStationModalIsOpen} setState={setCreateStationModal} location={location}/>
		</div>
	);
};

export default ListStations;
