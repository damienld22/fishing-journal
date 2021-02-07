import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Dialog, TextField} from '@material-ui/core';
import styles from '../components.module.css';

const CreateParameterModal = ({isOpen, onValidate, onClose}) => {
	const [parameter, setParameter] = useState('');

	return (
		<Dialog open={isOpen} onClose={onClose}>
			<div className={styles.container} style={{padding: 20}}>
				<p>Création d'un nouveau paramètre</p>

				<TextField
					className={styles.inputSelector}
					label="Paramètre"
					type="text"
					variant="outlined"
					value={parameter || ''}
					InputLabelProps={{
						shrink: true
					}}
					onChange={event => setParameter(event.target.value)}
				/>

				<div className={styles.buttons}>
					<Button onClick={() => {
						setParameter('');
						onClose();
					}}
					>Annuler
					</Button>
					<Button onClick={() => {
						const newParameter = parameter;
						setParameter('');
						onValidate(newParameter);
					}}
					>Créer
					</Button>
				</div>
			</div>
		</Dialog>
	);
};

CreateParameterModal.propTypes = {
	isOpen: PropTypes.bool,
	onValidate: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired
};

export default CreateParameterModal;
