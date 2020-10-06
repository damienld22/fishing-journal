import {Button, CircularProgress} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {getSessionWithDetails} from '../../requests';
import moment from 'moment';
import Snackbar from '../Snackbar';
import styles from '../components.module.css';

const calculateTotalWeight = session => {
	if (!session.fishes) {
		return 0;
	}

	let total = 0;

	session.fishes.forEach(fish => {
		total += fish.weight;
	});

	return total;
};

const DisplaySession = () => {
	const {id} = useParams();
	const [session, setSession] = useState({});
	const [displayProgress, setDisplayProgress] = useState(false);
	const [messageSnackbar, setMessageSnackbar] = useState(null);
	const history = useHistory();

	useEffect(() => {
		getSessionWithDetails(id)
			.then(({data}) => {
				setSession(data);
				setDisplayProgress(false);
			})
			.catch(() => {
				setMessageSnackbar('Erreur lors de la récupération de la session.');
				setDisplayProgress(false);
			});
	}, [id]);

	return (
		<div className={styles.containerAlignedToLeft}>
			<p>{`Début : ${moment.unix(session.start).format('LLL')}`}</p>
			<p>{`Fin : ${moment.unix(session.end).format('LLL')}`}</p>
			<p>{`Zone : ${session.locationName}`}</p>
			<p>{`Infos : ${session.otherInformations}`}</p>

			<div className={styles.cardWithBorder}>
				<div className={styles.containerCardWithBorder}>
					<p className={styles.textResult}>Nombre de prise(s) :</p>
					<p className={styles.textResultValue}>{session.fishes ? session.fishes.length : 0}</p>
				</div>
				<div className={styles.containerCardWithBorder}>
					<p className={styles.textResult}>Poids total des prises :</p>
					<p className={styles.textResultValue}>{calculateTotalWeight(session)} kg</p>
				</div>
			</div>

			<Button className={styles.buttonCancel} onClick={() => history.goBack()}>Retour</Button>

			{ displayProgress && <CircularProgress className={styles.progress}/>}
			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
		</div>
	);
};

export default DisplaySession;
