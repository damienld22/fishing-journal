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
import {deleteSession} from '../../requests';
import Snackbar from '../Snackbar';

const SessionItem = ({session, onClick, onDeleteDone}) => {
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [messageSnackbar, setMessageSnackbar] = useState(null);

	const handleDelete = () => {
		setMessageSnackbar(null);

		deleteSession(session._id)
			.then(() => {
				setDeleteModalOpen(false);
				onDeleteDone();
			})
			.catch(() => {
				setMessageSnackbar('Erreur lors de la suppression de la session');
			});
	};

	return (
		<>
			<Card style={styles.card} onClick={onClick}>
				<CardContent style={styles.cardContent}>
					<p style={styles.text}>{session.date}</p>

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
				<DialogTitle>Suppression session</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Voulez-vous réllement supprimer cette session ?
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

SessionItem.propTypes = {
	session: PropTypes.object,
	onClick: PropTypes.func.isRequired,
	onDeleteDone: PropTypes.func.isRequired
};

export default SessionItem;
