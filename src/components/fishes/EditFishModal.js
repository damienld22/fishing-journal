import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogTitle, Button, CircularProgress, MobileStepper} from '@material-ui/core';
import moment from 'moment';
import SelectPicture from './SelectPicture';
import SelectWeight from './SelectWeight';
import SelectDate from './SelectDate';
import SelectBait from './SelectBait';
import SelectPlace from './SelectPlace';
import Snackbar from '../Snackbar';
import {updateFishCatch} from '../../requests';
import styles from './fishes.module.css';

const EditFishModal = ({selectedFish, setSelectedFish}) => {
	const [step, setStep] = useState(0);
	const [picture, setPicture] = useState(selectedFish.picture);
	const [weight, setWeight] = useState(selectedFish.weight);
	const [date, setDate] = useState(selectedFish.catchDate);
	const [bait, setBait] = useState(selectedFish.bait);
	const [place, setPlace] = useState(selectedFish.place);
	const [messageSnackbar, setMessageSnackbar] = useState('');
	const [displayProgress, setDisplayProgress] = useState(false);

	const onValidate = () => {
		setDisplayProgress(true);

		updateFishCatch(selectedFish._id, {picture, weight: Number.parseFloat(weight, 10), catchDate: date, bait, place})
			.then(() => {
				setDisplayProgress(false);
				setSelectedFish(null);
				setStep(0);
			})
			.catch(() => {
				setMessageSnackbar('L\'édition de la capture a échouée.');
				setDisplayProgress(false);
			});
	};

	return (
		<Dialog fullWidth open={Boolean(selectedFish)} maxWidth="xl" onClose={() => setSelectedFish(null)}>
			<DialogTitle>{`Prise du ${moment.unix(date).format('LLL')}`}</DialogTitle>

			<div className={styles.content}>
				{ step === 0 && <SelectPicture picture={picture} onSelectPicture={setPicture}/>}
				{ step === 1 && <SelectWeight weight={weight} onSelectWeight={setWeight}/>}
				{ step === 2 && <SelectDate date={date} onSelectDate={setDate}/>}
				{ step === 3 && <SelectBait bait={bait} onSelectBait={setBait}/>}
				{ step === 4 && <SelectPlace place={place} onSelectPlace={setPlace}/>}

			</div>

			<div className={styles.buttonsAndStepper}>
				<MobileStepper variant="dots" steps={5} position="static" activeStep={step}/>
				<div className={styles.buttons}>
					{ step === 0 ? <Button className={styles.button} onClick={() => setSelectedFish(null)}>Annuler</Button> : <Button className={styles.button} onClick={() => setStep(step - 1)}>Précédent</Button>}
					{ step === 4 ? <Button className={styles.button} onClick={onValidate}>Confirmer</Button> : <Button className={styles.button} onClick={() => setStep(step + 1)}>Suivant</Button>}
				</div>
			</div>

			{ displayProgress && <CircularProgress className={styles.progress}/>}
			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
		</Dialog>
	);
};

EditFishModal.propTypes = {
	selectedFish: PropTypes.object,
	setSelectedFish: PropTypes.func.isRequired
};

export default EditFishModal;
