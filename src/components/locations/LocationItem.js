import React, {useState} from 'react';
import {Card, CardContent} from '@material-ui/core';
import PropTypes from 'prop-types';
import TrashIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {deleteLocation} from '../../requests';
import Snackbar from '../Snackbar';
import styles from '../components.module.css';

const LocationItem = ({location, onClick, onDeleteDone, onEdit}) => {
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [messageSnackbar, setMessageSnackbar] = useState(null);

	const handleDelete = () => {
		setMessageSnackbar(null);

		deleteLocation(location._id)
			.then(() => {
				setDeleteModalOpen(false);
				onDeleteDone();
			})
			.catch(() => {
				setMessageSnackbar('Erreur lors de la suppression de la zone de pêche');
			});
	};

	return (
		<>
			<Card raised className={styles.card} onClick={onClick}>
				<CardContent className={styles.cardContent}>
					<p>{location.name || '/'}</p>

					<div>
						<IconButton
							style={{margin: 0, padding: 5}} onClick={evt => {
								evt.preventDefault();
								evt.stopPropagation();
								onEdit();
							}}
						>
							<EditIcon/>
						</IconButton>
						<IconButton
							style={{margin: 0, padding: 5}} onClick={evt => {
								evt.preventDefault();
								evt.stopPropagation();
								setDeleteModalOpen(true);
							}}
						>
							<TrashIcon/>
						</IconButton>
					</div>
				</CardContent>
			</Card>

			<Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
				<DialogTitle>Suppression zone de pêche</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Voulez-vous réllement supprimer cette zone de pêche
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button color="primary" onClick={() => setDeleteModalOpen(false)}>
						Non
					</Button>
					<Button autoFocus color="primary" onClick={handleDelete}>
						Oui
					</Button>
				</DialogActions>
			</Dialog>

			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
		</>
	);
};

LocationItem.propTypes = {
	location: PropTypes.object,
	onClick: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	onDeleteDone: PropTypes.func.isRequired
};

export default LocationItem;
