import React, {useState} from 'react';
import {Card, CardContent, IconButton} from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import localization from 'moment/locale/fr';
import FullScreenPicture from '../generics/FullScreenPicture';
import DeleteConfirmationModal from '../generics/DeleteConfirmationModal';
import styles from '../components.module.css';

const FishItem = ({fish, onClick, onDeleteItem}) => {
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	moment().locale('fr', localization);

	const handleDeleteFishItem = evt => {
		evt.stopPropagation();
		setDeleteModalOpen(false);
		onDeleteItem(fish);
	};

	return (
		<Card raised className={styles.card} onClick={onClick}>
			<CardContent className={styles.cardContent}>
				{fish.picture ? <FullScreenPicture alt="catch" height={50} src={fish.picture}/> : <p>/</p>}
				<p>{fish.weight ? `${fish.weight} kg` : '/'}</p>
				<p>{fish.catchDate ? moment.unix(fish.catchDate).format('lll') : '/'}</p>
				<IconButton onClick={evt => {
					setDeleteModalOpen(true);
					evt.stopPropagation();
					evt.preventDefault();
				}}
				>
					<DeleteIcon/>
				</IconButton>
			</CardContent>

			<DeleteConfirmationModal
				isOpen={deleteModalOpen} onClose={evt => {
					evt.stopPropagation();
					setDeleteModalOpen(false);
				}} onValidate={handleDeleteFishItem}/>
		</Card>
	);
};

FishItem.propTypes = {
	fish: PropTypes.object,
	onClick: PropTypes.func.isRequired,
	onDeleteItem: PropTypes.func.isRequired
};

export default FishItem;
