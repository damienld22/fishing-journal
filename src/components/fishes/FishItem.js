import React, {useState} from 'react';
import {Card, CardContent, IconButton} from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import localization from 'moment/locale/fr';
import FullScreenPicture from '../generics/FullScreenPicture';
import DeleteConfirmationModal from '../generics/DeleteConfirmationModal';
import styles from '../components.module.css';

const FishItem = ({fish, onClick, onDeleteItem, onEdit}) => {
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
				<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.8em'}}>
					<p style={{margin: 0}}>{fish.weight ? `${fish.weight} kg` : '/'}</p>
					<p style={{margin: 0}}>{fish.catchDate ? moment.unix(fish.catchDate).format('lll') : '/'}</p>
				</div>

				<div>
					<IconButton
						style={{margin: 0, padding: 5}} onClick={evt => {
							setDeleteModalOpen(true);
							evt.stopPropagation();
							evt.preventDefault();
						}}
					>
						<DeleteIcon/>
					</IconButton>
					<IconButton
						style={{margin: 0, padding: 5}} onClick={evt => {
							evt.stopPropagation();
							evt.preventDefault();
							onEdit(fish);
						}}
					>
						<EditIcon/>
					</IconButton>
				</div>
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
	onDeleteItem: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired
};

export default FishItem;
