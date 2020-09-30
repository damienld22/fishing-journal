import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogTitle, Button, CircularProgress, MobileStepper} from '@material-ui/core';
import moment from 'moment';
import SelectStartEnd from './SelectStartEnd';
import SelectSessionLocation from './SelectSessionLocation';
import SelectOtherInfos from '../generics/SelectOtherInformations';
import Snackbar from '../Snackbar';
import {createSession, getLocations} from '../../requests';

const CreateSessionModal = ({isOpen, setState}) => {
	const [step, setStep] = useState(0);
	const [start, setStart] = useState(moment().unix());
	const [end, setEnd] = useState(moment().unix());
	const [location, setLocation] = useState(null);
	const [availableLocations, setAvailableLocations] = useState([]);
	const [otherInformations, setOtherInformations] = useState(null);
	const [messageSnackbar, setMessageSnackbar] = useState('');
	const [displayProgress, setDisplayProgress] = useState(false);

	useEffect(() => {
		getLocations()
			.then(({data}) => setAvailableLocations(data))
			.catch(() => console.error('Failed to get available locations'));
	}, []);

	const onValidate = () => {
		setDisplayProgress(true);
		createSession({start, end, location, otherInformations})
			.then(() => {
				setDisplayProgress(false);
				setState(false);
				setStep(0);
			})
			.catch(() => {
				setMessageSnackbar('La sauvegarde de la session a échouée.');
				setDisplayProgress(false);
			});
	};

	return (
		<Dialog fullWidth open={isOpen} maxWidth="xl" onClose={() => setState(false)}>
			<DialogTitle>Nouvelle session</DialogTitle>

			<div style={styles.content}>
				{ step === 0 && <SelectStartEnd start={start} end={end} onSelectStart={setStart} onSelectEnd={setEnd}/>}
				{ step === 1 && <SelectSessionLocation location={location} availableLocations={availableLocations} onSelectLocation={setLocation}/>}
				{ step === 2 && <SelectOtherInfos otherInfos={otherInformations} onSelectOtherInfos={setOtherInformations}/>}
			</div>

			<div style={styles.buttonsAndStepper}>
				<MobileStepper variant="dots" steps={3} position="static" activeStep={step}/>
				<div style={styles.buttons}>
					{ step === 0 ? <Button style={styles.button} onClick={() => setState(false)}>Annuler</Button> : <Button style={styles.button} onClick={() => setStep(step - 1)}>Précédent</Button>}
					{ step === 2 ? <Button style={styles.button} onClick={onValidate}>Confirmer</Button> : <Button style={styles.button} onClick={() => setStep(step + 1)}>Suivant</Button>}
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

CreateSessionModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setState: PropTypes.func.isRequired
};

export default CreateSessionModal;
