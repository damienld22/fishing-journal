import React, {useState} from 'react';
import {Card, CardContent} from '@material-ui/core';
import PropTypes from 'prop-types';
import TrashIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {deleteLocation} from '../../requests';
import Snackbar from '../Snackbar';

const LocationItem = ({location, onClick, onDeleteDone}) => {
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
			<Card style={styles.card} onClick={onClick}>
				<CardContent style={styles.cardContent}>
					<p style={styles.text}>{location.name || '/'}</p>

					<IconButton onClick={evt => {
						evt.preventDefault();
						evt.stopPropagation();
						setDeleteModalOpen(true);
					}}
					>
						<TrashIcon/>
					</IconButton>
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

const styles = {
	card: {
		width: '90%',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 10,
		marginBottom: 10,
		paddingTop: 0,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 0
	},
	cardContent: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 0
	},
	text: {
		fontSize: '1.5em'
	}
};

LocationItem.propTypes = {
	location: PropTypes.object,
	onClick: PropTypes.func.isRequired,
	onDeleteDone: PropTypes.func.isRequired
};

export default LocationItem;
