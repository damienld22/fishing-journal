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
import {deleteSession} from '../../requests';
import Snackbar from '../Snackbar';
import moment from 'moment';
import styles from '../components.module.css';

const SessionItem = ({session, onClick, onDeleteDone, availableLocations, onEdit}) => {
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [messageSnackbar, setMessageSnackbar] = useState(null);

	const findLocationName = (session, availableLocations) => {
		const found = availableLocations.find(location => location._id === session.location);
		return found ? found.name : '/';
	};

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
			<Card className={styles.card} onClick={onClick}>
				<CardContent className={styles.cardContent}>
					<div>
						<p className={styles.text}>{moment.unix(session.start).format('L')}</p>
						<p className={styles.text}>{findLocationName(session, availableLocations)}</p>
					</div>

					<div>
						<IconButton onClick={evt => {
							evt.preventDefault();
							evt.stopPropagation();
							onEdit(session);
						}}
						>
							<EditIcon/>
						</IconButton>

						<IconButton onClick={evt => {
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

SessionItem.propTypes = {
	session: PropTypes.object,
	onClick: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	onDeleteDone: PropTypes.func.isRequired,
	availableLocations: PropTypes.arrayOf(PropTypes.object)
};

export default SessionItem;
