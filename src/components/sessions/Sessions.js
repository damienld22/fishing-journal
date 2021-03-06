import React, {useEffect, useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import {getSessions, getLocations} from '../../requests';
import Snackbar from '../Snackbar';
import {List, CircularProgress} from '@material-ui/core';
import SessionItem from './SessionItem';
import CreateSessionModal from './CreateSessionModal';
import EditSessionModal from './EditSessionModal';
import styles from '../components.module.css';
import {useHistory} from 'react-router-dom';

const Sessions = () => {
	const [createSessionModalIsOpen, setCreateSessionModalIsOpen] = useState(false);
	const [sessions, setSessions] = useState([]);
	const [toEditSession, setToEditSession] = useState(null);
	const [displayProgress, setDisplayProgress] = useState(false);
	const [messageSnackbar, setMessageSnackbar] = useState(null);
	const [availableLocations, setAvailableLocations] = useState([]);
	const history = useHistory();

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
		if (!createSessionModalIsOpen || !toEditSession) {
			setDisplayProgress(true);
			getSessionsFromServer();
		}
	}, [createSessionModalIsOpen, toEditSession]);

	return (
		<div className={styles.container}>
			<h1>Sessions</h1>

			<div className={styles.scrollList}>
				<List>
					{
						sessions.map(session => (
							<SessionItem
								key={session._id}
								session={session}
								availableLocations={availableLocations}
								onClick={id => history.push(`/sessions/${id}`)}
								onDeleteDone={getSessionsFromServer}
								onEdit={setToEditSession}/>
						))
					}
				</List>
			</div>

			<IconButton className={styles.addButton} onClick={() => setCreateSessionModalIsOpen(true)}>
				<AddIcon/>
			</IconButton>

			{ displayProgress && <CircularProgress className={styles.progress}/>}
			{toEditSession && <EditSessionModal session={toEditSession} setToEditSession={setToEditSession}/>}
			<CreateSessionModal isOpen={createSessionModalIsOpen} setState={setCreateSessionModalIsOpen}/>
			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
		</div>
	);
};

export default Sessions;
