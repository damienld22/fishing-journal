import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogTitle, Button, CircularProgress, MobileStepper} from '@material-ui/core';
import moment from 'moment';
import SelectPicture from '../shared/SelectPicture';
import SelectWeight from './SelectWeight';
import SelectDate from './SelectDate';
import SelectBait from './SelectBait';
import SelectPlace from './SelectPlace';
import Snackbar from '../Snackbar';
import {createFishCatch} from '../../requests';
import styles from '../components.module.css';
import FullScreenPicture from '../generics/FullScreenPicture';

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
		createFishCatch({weight: Number.parseFloat(weight, 10), catchDate: date, bait, place}, picture)
			.then(() => {
				setDisplayProgress(false);
				setStep(0);
				setPicture(null);
				setWeight(null);
				setDate(moment().unix());
				setBait(null);
				setPlace(null);
				setState(false);
			})
			.catch(() => {
				setMessageSnackbar('La sauvegarde de la capture a échouée.');
				setDisplayProgress(false);
			});
	};

	return (
		<Dialog fullWidth open={isOpen} maxWidth="xl" onClose={() => setState(false)}>
			<DialogTitle>Nouvelle prise</DialogTitle>

			<div className={styles.content}>
				{ step === 0 && <SelectPicture picture={picture} pictureContainer={FullScreenPicture} onSelectPicture={setPicture}/>}
				{ step === 1 && <SelectWeight weight={weight} onSelectWeight={setWeight}/>}
				{ step === 2 && <SelectDate date={date} onSelectDate={setDate}/>}
				{ step === 3 && <SelectBait bait={bait} onSelectBait={setBait}/>}
				{ step === 4 && <SelectPlace place={place} onSelectPlace={setPlace}/>}
			</div>

			<div className={styles.buttonsAndStepper}>
				<MobileStepper variant="dots" steps={5} position="static" activeStep={step}/>
				<div className={styles.buttons}>
					{ step === 0 ? <Button className={styles.button} onClick={() => setState(false)}>Annuler</Button> : <Button className={styles.button} onClick={() => setStep(step - 1)}>Précédent</Button>}
					{ step === 4 ? <Button className={styles.button} onClick={onValidate}>Confirmer</Button> : <Button className={styles.button} onClick={() => setStep(step + 1)}>Suivant</Button>}
				</div>
			</div>

			{ displayProgress && <CircularProgress className={styles.progress}/>}
			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
		</Dialog>
	);
};

CreateFishModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setState: PropTypes.func.isRequired
};

export default CreateFishModal;
