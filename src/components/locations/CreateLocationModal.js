import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogTitle, Button, CircularProgress, MobileStepper} from '@material-ui/core';
import Snackbar from '../Snackbar';
import {createLocation} from '../../requests';
import SelectLocation from './SelectLocation';
import SelectFishInfos from './SelectFishInfos';
import SelectNightFishing from './SelectNightFishing';
import SelectOtherInfos from '../generics/SelectOtherInformations';
import SelectNameLocation from './SelectNameLocation';
import styles from '../components.module.css';

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
		<Dialog fullWidth open={isOpen} maxWidth="xl" onClose={() => setState(false)}>
			<DialogTitle>Nouvelle zone de pêche</DialogTitle>

			<div className={styles.content}>
				{ step === 0 && <SelectNameLocation nameLocation={name} onSelectNameLocation={setName}/>}
				{ step === 1 && <SelectLocation location={location} onSelectLocation={setLocation}/>}
				{ step === 2 && <SelectFishInfos fishInfos={fishInfos} onSelectFishInfos={setFishInfos}/>}
				{ step === 3 && <SelectNightFishing nightFishing={nightFishing} onSelectNightFishing={setNightFishing}/>}
				{ step === 4 && <SelectOtherInfos otherInfos={otherInformations} onSelectOtherInfos={setOtherInformations}/>}

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

CreateLocationModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setState: PropTypes.func.isRequired
};

export default CreateLocationModal;
