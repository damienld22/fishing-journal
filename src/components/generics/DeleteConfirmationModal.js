import React from 'react';
import PropTypes from 'prop-types';
import {Button, Dialog} from '@material-ui/core';
import styles from '../components.module.css';

const DeleteConfirmationModal = ({isOpen, onValidate, onClose}) => {
	return (
		<Dialog open={isOpen} onClose={onClose}>
			<div className={styles.container} style={{padding: 20}}>
				<p>Êtes vous sûr de vouloir supprimer cet élément ?</p>

				<div className={styles.buttons}>
					<Button onClick={onClose}>Annuler</Button>
					<Button onClick={onValidate}>Supprimer</Button>
				</div>
			</div>
		</Dialog>
	);
};

DeleteConfirmationModal.propTypes = {
	isOpen: PropTypes.bool,
	onValidate: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired
};

export default DeleteConfirmationModal;
