import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogTitle, Button, CircularProgress, MobileStepper} from '@material-ui/core';
import Snackbar from '../Snackbar';
import {updateLocation} from '../../requests';
import SelectLocation from './SelectLocation';
import SelectFishInfos from './selectFishInfos';
import SelectNightFishing from './SelectNightFishing';
import SelectOtherInfos from './SelectOtherInformations';
import SelectNameLocation from './SelectNameLocation';

const EditLocationModal = ({selectedLocation, setSelectedLocation}) => {
	const [step, setStep] = useState(0);
	const [name, setName] = useState(selectedLocation.name);
	const [location, setLocation] = useState(selectedLocation.location);
	const [fishInfos, setFishInfos] = useState(selectedLocation.fishInfos);
	const [nightFishing, setNightFishing] = useState(selectedLocation.nightFishing);
	const [otherInformations, setOtherInformations] = useState(selectedLocation.otherInformations);
	const [messageSnackbar, setMessageSnackbar] = useState('');
	const [displayProgress, setDisplayProgress] = useState(false);

	const onValidate = () => {
		setDisplayProgress(true);
		updateLocation(selectedLocation._id, {name, location, fishInfos, nightFishing, otherInformations})
			.then(() => {
				setDisplayProgress(false);
				setSelectedLocation(null);
				setStep(0);
			})
			.catch(() => {
				setMessageSnackbar('L\'édition de la zone de pêche a échouée.');
				setDisplayProgress(false);
			});
	};

	return (
		<Dialog fullWidth open={Boolean(selectedLocation)} maxWidth="xl" onClose={() => setSelectedLocation(null)}>
			<DialogTitle>{selectedLocation.name || 'Plan d\'eau'}</DialogTitle>

			<div style={styles.content}>
				{ step === 0 && <SelectNameLocation nameLocation={name} onSelectNameLocation={setName}/>}
				{ step === 1 && <SelectLocation location={location} onSelectLocation={setLocation}/>}
				{ step === 2 && <SelectFishInfos fishInfos={fishInfos} onSelectFishInfos={setFishInfos}/>}
				{ step === 3 && <SelectNightFishing nightFishing={nightFishing} onSelectNightFishing={setNightFishing}/>}
				{ step === 4 && <SelectOtherInfos otherInfos={otherInformations} onSelectOtherInfos={setOtherInformations}/>}

			</div>

			<div style={styles.buttonsAndStepper}>
				<MobileStepper variant="dots" steps={5} position="static" activeStep={step}/>
				<div style={styles.buttons}>
					{ step === 0 ? <Button style={styles.button} onClick={() => setSelectedLocation(null)}>Annuler</Button> : <Button style={styles.button} onClick={() => setStep(step - 1)}>Précédent</Button>}
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

EditLocationModal.propTypes = {
	selectedLocation: PropTypes.object,
	setSelectedLocation: PropTypes.func.isRequired
};

export default EditLocationModal;
