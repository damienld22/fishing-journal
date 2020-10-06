import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogTitle, Button, CircularProgress, MobileStepper} from '@material-ui/core';
import SelectStartEnd from './SelectStartEnd';
import SelectSessionLocation from './SelectSessionLocation';
import SelectOtherInfos from '../generics/SelectOtherInformations';
import Snackbar from '../Snackbar';
import {updateSession, getLocations} from '../../requests';
import styles from '../components.module.css';

const EditSessionModal = ({session, setToEditSession}) => {
	const [step, setStep] = useState(0);
	const [start, setStart] = useState(session.start);
	const [end, setEnd] = useState(session.end);
	const [location, setLocation] = useState(session.location);
	const [availableLocations, setAvailableLocations] = useState([]);
	const [otherInformations, setOtherInformations] = useState(session.otherInformations);
	const [messageSnackbar, setMessageSnackbar] = useState('');
	const [displayProgress, setDisplayProgress] = useState(false);

	useEffect(() => {
		getLocations()
			.then(({data}) => setAvailableLocations(data))
			.catch(() => console.error('Failed to get available locations'));
	}, []);

	const onValidate = () => {
		setDisplayProgress(true);
		updateSession(session._id, {start, end, location, otherInformations})
			.then(() => {
				setDisplayProgress(false);
				setToEditSession(null);
				setStep(0);
			})
			.catch(() => {
				setMessageSnackbar('L\'édition de la session a échouée.');
				setDisplayProgress(false);
			});
	};

	return (
		<Dialog fullWidth open={Boolean(session)} maxWidth="xl" onClose={() => setToEditSession(null)}>
			<DialogTitle>Session</DialogTitle>

			<div className={styles.content}>
				{ step === 0 && <SelectStartEnd start={start} end={end} onSelectStart={setStart} onSelectEnd={setEnd}/>}
				{ step === 1 && <SelectSessionLocation location={location} availableLocations={availableLocations} onSelectLocation={setLocation}/>}
				{ step === 2 && <SelectOtherInfos otherInfos={otherInformations} onSelectOtherInfos={setOtherInformations}/>}
			</div>

			<div className={styles.buttonsAndStepper}>
				<MobileStepper variant="dots" steps={3} position="static" activeStep={step}/>
				<div className={styles.buttons}>
					{ step === 0 ? <Button className={styles.button} onClick={() => setToEditSession(null)}>Annuler</Button> : <Button className={styles.button} onClick={() => setStep(step - 1)}>Précédent</Button>}
					{ step === 2 ? <Button className={styles.button} onClick={onValidate}>Confirmer</Button> : <Button className={styles.button} onClick={() => setStep(step + 1)}>Suivant</Button>}
				</div>
			</div>

			{ displayProgress && <CircularProgress className={styles.progress}/>}
			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
		</Dialog>
	);
};

EditSessionModal.propTypes = {
	session: PropTypes.object,
	setToEditSession: PropTypes.func.isRequired
};

export default EditSessionModal;
