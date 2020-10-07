import {Button, CircularProgress} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {getSessionWithDetails, updateSession} from '../../requests';
import moment from 'moment';
import Snackbar from '../Snackbar';
import EditableTextField from '../generics/EditableTextField';
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
	const [displayProgress, setDisplayProgress] = useState(true);
	const [messageSnackbar, setMessageSnackbar] = useState(null);
	const history = useHistory();

	const updateComments = comments => {
		if (session._id) {
			setDisplayProgress(true);
			updateSession(session._id, {comments})
				.then(() => {
					setSession(previous => ({...previous, comments}));
					setDisplayProgress(false);
				})
				.catch(() => {
					setDisplayProgress(false);
					setMessageSnackbar('Erreur lors de l\'édition des commentaires.');
				});
		}
	};

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
			<p className={styles.textResult}>{`Début : ${moment.unix(session.start).format('LLL')}`}</p>
			<p className={styles.textResult}>{`Fin : ${moment.unix(session.end).format('LLL')}`}</p>
			<p className={styles.textResult}>{`Zone : ${session.locationName}`}</p>
			<p className={styles.textResult}>{`Infos : ${session.otherInformations}`}</p>

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

			<div className={styles.card}>
				<EditableTextField text={session.comments} onValidate={updateComments}/>
			</div>

			<Button className={styles.buttonCancel} onClick={() => history.goBack()}>Retour</Button>

			{ displayProgress && <CircularProgress className={styles.progress}/>}
			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
		</div>
	);
};

export default DisplaySession;
