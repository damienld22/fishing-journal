import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogTitle, Button, CircularProgress, MobileStepper} from '@material-ui/core';
import Snackbar from '../Snackbar';
import {createLocation} from '../../requests';
import SelectLocation from './SelectLocation';
import SelectFishInfos from './selectFishInfos';
import SelectNightFishing from './SelectNightFishing';
import SelectOtherInfos from './SelectOtherInformations';
import SelectNameLocation from './SelectNameLocation';

const CreateLocationModal = ({isOpen, setState}) => {
	const [step, setStep] = useState(0);
	const [name, setName] = useState(null);
	const [location, setLocation] = useState(null);
	const [fishInfos, setFishInfos] = useState(null);
	const [nightFishing, setNightFishing] = useState(null);
	const [otherInformations, setOtherInformations] = useState(null);
	const [messageSnackbar, setMessageSnackbar] = useState('');
	const [displayProgress, setDisplayProgress] = useState(false);

	const onValidate = () => {
		setDisplayProgress(true);
		createLocation({name, location, fishInfos, nightFishing, otherInformations})
			.then(() => {
				setDisplayProgress(false);
				setState(false);
				setStep(0);
			})
			.catch(() => {
				setMessageSnackbar('La sauvegarde de la zone de pêche a échouée.');
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
			<DialogTitle>Nouvelle zone de pêche</DialogTitle>

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

CreateLocationModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setState: PropTypes.func.isRequired
};

export default CreateLocationModal;
