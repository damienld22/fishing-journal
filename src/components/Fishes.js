import React, {useEffect, useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CreateFishModal from './createFish/createFishModal';
import DisplayFishModal from './DisplayFishModal';
import {getFishCatch} from '../requests';
import Snackbar from './Snackbar';
import FishItem from './FishItem';
import {List, Paper} from '@material-ui/core';

const Fishes = () => {
	const [createFishModalIsOpen, setCreateFishModalIsOpen] = useState(false);
	const [fishes, setFishes] = useState([]);
	const [selectedFish, setSelectedFish] = useState(null);
	const [messageSnackbar, setMessageSnackbar] = useState(null);

	useEffect(() => {
		if (!createFishModalIsOpen || !selectedFish) {
			getFishCatch()
				.then(({data}) => setFishes(data))
				.catch(() => setMessageSnackbar('Erreur lors de la récupération des captures.'));
		}
	}, [createFishModalIsOpen, selectedFish]);

	return (
		<div style={styles.container}>
			<h1>Liste des prises</h1>

			<Paper style={styles.scrollList}>
				<List>
					{
						fishes.map(fish => (
							<FishItem key={fish._id} fish={fish} onClick={() => setSelectedFish(fish)}/>
						))
					}
				</List>
			</Paper>

			<IconButton style={styles.addButton} onClick={() => setCreateFishModalIsOpen(true)}>
				<AddIcon/>
			</IconButton>

			{selectedFish && <DisplayFishModal isOpen={Boolean(selectedFish)} setState={() => setSelectedFish(null)} fish={selectedFish}/>}
			<CreateFishModal isOpen={createFishModalIsOpen} setState={setCreateFishModalIsOpen}/>
			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
		</div>
	);
};

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	scrollList: {
		minHeight: '75vh',
		maxHeight: '75vh',
		width: '100%',
		overflow: 'auto'
	},
	addButton: {
		position: 'absolute',
		bottom: '10%',
		right: '10%',
		backgroundColor: 'blue',
		color: 'white'
	}
};

export default Fishes;
