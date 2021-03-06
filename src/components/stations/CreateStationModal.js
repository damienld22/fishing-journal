import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogTitle, Button, CircularProgress, MobileStepper, Snackbar} from '@material-ui/core';
import {createStation} from '../../requests';
import SelectPicture from '../shared/SelectPicture';
import SelectNumber from './SelectNumber';
import SelectOrientation from './SelectOrientation';
import SelectTextInput from '../shared/SelectTextInput';
import FullScreenPictureWithMarker from './FullScreenPictureWithMarker';
import SelectLocation from '../locations/SelectLocation';

const CreateStationModal = ({isOpen, setState, location}) => {
	const [step, setStep] = useState(0);
	const [name, setName] = useState(null);
	const [picture, setPicture] = useState(null);
	const [description, setDescription] = useState(null);
	const [markers, setMarkers] = useState([]);
	const [distance, setDistance] = useState(null);
	const [depth, setDepth] = useState(null);
	const [orientation, setOrientation] = useState(null);
	const [throwingLocation, setThrowingLocation] = useState(null);
	const [messageSnackbar, setMessageSnackbar] = useState('');
	const [displayProgress, setDisplayProgress] = useState(false);

	const onValidate = () => {
		setDisplayProgress(true);
		createStation({distance, depth, orientation, description, location, name, markers, throwingLocation}, picture)
			.then(() => {
				setDisplayProgress(false);
				setStep(0);
				setPicture(null);
				setName(null);
				setDistance(null);
				setDescription(null);
				setDepth(null);
				setOrientation(null);
				setThrowingLocation(null);
				setMarkers([]);
				setState(false);
			})
			.catch(() => {
				setMessageSnackbar('La sauvegarde du poste a échouée.');
				setDisplayProgress(false);
			});
	};

	return (
		<Dialog fullWidth open={isOpen} maxWidth="xl" onClose={() => setState(false)}>
			<DialogTitle>Nouveau poste</DialogTitle>

			<div style={{height: '50vh'}}>
				{ step === 0 && <SelectPicture picture={picture} pictureContainer={props => <FullScreenPictureWithMarker {...props} markers={markers} onSelectMarkers={setMarkers}/>} onSelectPicture={setPicture}/>}
				{ step === 1 && <SelectTextInput title="Nom" value={name} onSelectValue={setName}/>}
				{ step === 2 && <SelectTextInput title="Description" value={description} onSelectValue={setDescription}/>}
				{ step === 3 && <SelectNumber title="Distance" value={distance} onSelectValue={setDistance}/>}
				{ step === 4 && <SelectNumber title="Profondeur" value={depth} onSelectValue={setDepth}/>}
				{ step === 5 && <SelectOrientation value={orientation} onSelectValue={setOrientation}/>}
				{ step === 6 && <SelectLocation location={throwingLocation} onSelectLocation={setThrowingLocation}/>}
			</div>

			<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				<MobileStepper variant="dots" steps={7} position="static" activeStep={step}/>
				<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: '10px'}}>
					{ step === 0 ? <Button style={{width: '40vw'}} onClick={() => setState(false)}>Annuler</Button> : <Button style={{width: '40vw'}} onClick={() => setStep(step - 1)}>Précédent</Button>}
					{ step === 6 ? <Button style={{width: '40vw'}} onClick={onValidate}>Confirmer</Button> : <Button style={{width: '40vw'}} onClick={() => setStep(step + 1)}>Suivant</Button>}
				</div>
			</div>

			{ displayProgress && <CircularProgress style={{position: 'absolute', top: '50%', left: 'calc(50% - 20px)'}}/>}
			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
		</Dialog>
	);
};

CreateStationModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	location: PropTypes.string.isRequired,
	setState: PropTypes.func.isRequired
};

export default CreateStationModal;

