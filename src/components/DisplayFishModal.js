import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogTitle, CircularProgress, Button} from '@material-ui/core';
import moment from 'moment';
import Snackbar from './Snackbar';
import {deleteFishCatch} from '../requests';
import localization from 'moment/locale/fr';

const DisplayFishModal = ({isOpen, setState, fish}) => {
	const [messageSnackbar, setMessageSnackbar] = useState('');
	const [displayProgress, setDisplayProgress] = useState(false);
	moment().locale('fr', localization);

	const onDelete = () => {
		setDisplayProgress(true);
		deleteFishCatch(fish._id)
			.then(() => {
				setDisplayProgress(false);
				setState(false);
			})
			.catch(() => {
				setMessageSnackbar('La suppresion a échouée.');
				setDisplayProgress(false);
			});
	};

	return (
		<Dialog
			fullWidth
			open={isOpen}
			maxWidth="xl"
			onClose={() => setState(false)}
		>
			<DialogTitle>Capture</DialogTitle>

			<div style={styles.content}>
				{fish.picture ? <img alt="catch" height={100} src={fish.picture}/> : <p>/</p>}
				<p>{fish.weight ? `${fish.weight} kg` : '/'}</p>
				<p>{fish.catchDate ? moment(fish.catchDate * 1000).format('lll') : '/'}</p>
				{fish.bait && <p>{`Appat : ${fish.bait}`}</p>}
				{fish.place && <p style={styles.place}>{fish.place}</p>}
			</div>

			<div style={styles.buttons}>
				<Button onClick={() => setState(false)}>Retour</Button>
				<Button onClick={onDelete}>Supprimer</Button>
			</div>

			{ displayProgress && <CircularProgress style={styles.progress}/>}
			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
		</Dialog>
	);
};

const styles = {
	content: {
		height: '50vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	progress: {
		position: 'absolute',
		left: 'calc(50% - 20px)',
		top: '50%'
	},
	place: {
		fontStyle: 'italic'
	},
	buttons: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingBottom: 10
	}
};

DisplayFishModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setState: PropTypes.func.isRequired,
	fish: PropTypes.object
};

export default DisplayFishModal;
