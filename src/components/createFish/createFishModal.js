import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogTitle, Button, CircularProgress, MobileStepper} from '@material-ui/core';
import moment from 'moment';
import SelectPicture from './selectPicture';
import SelectWeight from './selectWeight';
import SelectDate from './selectDate';
import SelectBait from './selectBait';
import SelectPlace from './selectPlace';
import Snackbar from '../Snackbar';
import {createFishCatch} from '../../requests';

const CreateFishModal = ({isOpen, setState}) => {
	const [step, setStep] = useState(0);
	const [picture, setPicture] = useState(null);
	const [weight, setWeight] = useState(null);
	const [date, setDate] = useState(moment().unix());
	const [bait, setBait] = useState(null);
	const [place, setPlace] = useState(null);
	const [messageSnackbar, setMessageSnackbar] = useState('');
	const [displayProgress, setDisplayProgress] = useState(false);

	const onValidate = () => {
		setDisplayProgress(true);
		createFishCatch({picture, weight: Number.parseFloat(weight, 10), catchDate: date, bait, place})
			.then(() => {
				setDisplayProgress(false);
				setState(false);
				setStep(0);
			})
			.catch(() => {
				setMessageSnackbar('La sauvegarde de la capture a échouée.');
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
			<DialogTitle>Nouvelle prise</DialogTitle>

			<div style={styles.content}>
				{ step === 0 && <SelectPicture picture={picture} onSelectPicture={setPicture}/>}
				{ step === 1 && <SelectWeight onSelectWeight={setWeight}/>}
				{ step === 2 && <SelectDate date={date} onSelectDate={setDate}/>}
				{ step === 3 && <SelectBait bait={bait} onSelectBait={setBait}/>}
				{ step === 4 && <SelectPlace place={place} onSelectPlace={setPlace}/>}

			</div>

			<div style={styles.buttonsAndStepper}>
				<MobileStepper variant="dots" steps={5} position="static" activeStep={step}/>
				<div style={styles.buttons}>
					{ step === 0 ? <Button style={styles.button} onClick={() => setState(false)}>Annuler</Button> : <Button style={styles.button} onClick={() => setStep(step - 1)}>Précédent</Button>}
					{ step === 4 ? <Button style={styles.button} onClick={onValidate}>Confirmer</Button> : <Button style={styles.button} onClick={() => setStep(step + 1)}>Suivant</Button>}
				</div>
			</div>

			{ displayProgress && <CircularProgress style={styles.progress}/>}
			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
		</Dialog>
	);
};

const styles = {
	content: {
		height: '50vh'
	},
	progress: {
		position: 'absolute',
		left: 'calc(50% - 20px)',
		top: '50%'
	},
	buttonsAndStepper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	buttons: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingBottom: 10
	},
	button: {
		width: '40vw'
	}
};

CreateFishModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setState: PropTypes.func.isRequired
};

export default CreateFishModal;
