import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogTitle, Button, CircularProgress, MobileStepper, Snackbar} from '@material-ui/core';
import {updateStation} from '../../requests';
import SelectPicture from '../shared/SelectPicture';
import SelectNumber from './SelectNumber';
import SelectOrientation from './SelectOrientation';
import SelectDescription from '../shared/SelectDescription';

const EditStationModal = ({selectedStation, setSelectedStation}) => {
	const currentPicture = selectedStation.picture;
	const [step, setStep] = useState(0);
	const [picture, setPicture] = useState(selectedStation.picture);
	const [description, setDescription] = useState(selectedStation.description);
	const [distance, setDistance] = useState(selectedStation.distance);
	const [depth, setDepth] = useState(selectedStation.depth);
	const [orientation, setOrientation] = useState(selectedStation.orientation);
	const [messageSnackbar, setMessageSnackbar] = useState('');
	const [displayProgress, setDisplayProgress] = useState(false);

	const onValidate = () => {
		setDisplayProgress(true);

		const newPicture = currentPicture === picture ? null : picture;
		updateStation(selectedStation._id, {distance, depth, orientation, description, location: selectedStation.location}, newPicture)
			.then(() => {
				setDisplayProgress(false);
				setStep(0);
				setPicture(null);
				setDistance(null);
				setDescription(null);
				setDepth(null);
				setOrientation(null);
				setSelectedStation(null);
			})
			.catch(() => {
				setMessageSnackbar('L\'édition du poste a échouée.');
				setDisplayProgress(false);
			});
	};

	return (
		<Dialog fullWidth open={Boolean(selectedStation)} maxWidth="xl" onClose={() => setSelectedStation(null)}>
			<DialogTitle>Édition du poste</DialogTitle>

			<div style={{height: '50vh'}}>
				{ step === 0 && <SelectPicture picture={picture} onSelectPicture={setPicture}/>}
				{ step === 1 && <SelectDescription description={description} onSelectDescription={setDescription}/>}
				{ step === 2 && <SelectNumber title="Distance" value={distance} onSelectValue={setDistance}/>}
				{ step === 3 && <SelectNumber title="Profondeur" value={depth} onSelectValue={setDepth}/>}
				{ step === 4 && <SelectOrientation value={orientation} onSelectValue={setOrientation}/>}
			</div>

			<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				<MobileStepper variant="dots" steps={5} position="static" activeStep={step}/>
				<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: '10px'}}>
					{ step === 0 ? <Button style={{width: '40vw'}} onClick={() => setSelectedStation(null)}>Annuler</Button> : <Button style={{width: '40vw'}} onClick={() => setStep(step - 1)}>Précédent</Button>}
					{ step === 4 ? <Button style={{width: '40vw'}} onClick={onValidate}>Confirmer</Button> : <Button style={{width: '40vw'}} onClick={() => setStep(step + 1)}>Suivant</Button>}
				</div>
			</div>

			{ displayProgress && <CircularProgress style={{position: 'absolute', top: '50%', left: 'calc(50% - 20px)'}}/>}
			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
		</Dialog>
	);
};

EditStationModal.propTypes = {
	selectedStation: PropTypes.object,
	setSelectedStation: PropTypes.func.isRequired
};

export default EditStationModal;

