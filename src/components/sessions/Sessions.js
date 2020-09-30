import React, {useEffect, useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import {getSessions, getLocations} from '../../requests';
import Snackbar from '../Snackbar';
import {List, Paper, CircularProgress} from '@material-ui/core';
import SessionItem from './SessionItem';
import CreateSessionModal from './CreateSessionModal';

const Sessions = () => {
	const [createSessionModalIsOpen, setCreateSessionModalIsOpen] = useState(false);
	const [sessions, setSessions] = useState([]);
	const [selectedSession, setSelectedSession] = useState(null);
	const [displayProgress, setDisplayProgress] = useState(false);
	const [messageSnackbar, setMessageSnackbar] = useState(null);
	const [availableLocations, setAvailableLocations] = useState([]);

	useEffect(() => {
		getLocations()
			.then(({data}) => setAvailableLocations(data))
			.catch(() => console.error('Failed to get available locations'));
	}, []);

	function getSessionsFromServer() {
		getSessions()
			.then(({data}) => {
				setSessions(data);
				setDisplayProgress(false);
			})
			.catch(() => {
				setMessageSnackbar('Erreur lors de la récupération des sessions.');
				setDisplayProgress(false);
			});
	}

	useEffect(() => {
		if (!createSessionModalIsOpen || !selectedSession) {
			setDisplayProgress(true);
			getSessionsFromServer();
		}
	}, [createSessionModalIsOpen, selectedSession]);

	return (
		<div style={styles.container}>
			<h1>Sessions</h1>

			<Paper style={styles.scrollList}>
				<List>
					{
						sessions.map(session => (
							<SessionItem
								key={session._id}
								session={session}
								availableLocations={availableLocations}
								onClick={() => setSelectedSession(session)}
								onDeleteDone={getSessionsFromServer}/>
						))
					}
				</List>
			</Paper>

			<IconButton style={styles.addButton} onClick={() => setCreateSessionModalIsOpen(true)}>
				<AddIcon/>
			</IconButton>

			{ displayProgress && <CircularProgress style={styles.progress}/>}
			{/* {selectedLocation && <EditLocationModal selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>} */}
			<CreateSessionModal isOpen={createSessionModalIsOpen} setState={setCreateSessionModalIsOpen}/>
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

export default Sessions;
