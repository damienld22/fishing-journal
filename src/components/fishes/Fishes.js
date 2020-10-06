import React, {useEffect, useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CreateFishModal from './CreateFishModal';
import {getFishCatch} from '../../requests';
import Snackbar from '../Snackbar';
import FishItem from './FishItem';
import {List, Paper, CircularProgress} from '@material-ui/core';
import EditFishModal from './EditFishModal';
import styles from '../components.module.css';

const Fishes = () => {
	const [createFishModalIsOpen, setCreateFishModalIsOpen] = useState(false);
	const [fishes, setFishes] = useState([]);
	const [selectedFish, setSelectedFish] = useState(null);
	const [displayProgress, setDisplayProgress] = useState(false);
	const [messageSnackbar, setMessageSnackbar] = useState(null);

	useEffect(() => {
		if (!createFishModalIsOpen || !selectedFish) {
			setDisplayProgress(true);
			getFishCatch()
				.then(({data}) => {
					setFishes(data);
					setDisplayProgress(false);
				})
				.catch(() => {
					setMessageSnackbar('Erreur lors de la récupération des captures.');
					setDisplayProgress(false);
				});
		}
	}, [createFishModalIsOpen, selectedFish]);

	return (
		<div className={styles.container}>
			<h1>Liste des prises</h1>

			<Paper className={styles.scrollList}>
				<List>
					{
						fishes.map(fish => (
							<FishItem key={fish._id} fish={fish} onClick={() => setSelectedFish(fish)}/>
						))
					}
				</List>
			</Paper>

			<IconButton className={styles.addButton} onClick={() => setCreateFishModalIsOpen(true)}>
				<AddIcon/>
			</IconButton>

			{ displayProgress && <CircularProgress className={styles.progress}/>}
			{selectedFish && <EditFishModal selectedFish={selectedFish} setSelectedFish={setSelectedFish}/>}
			<CreateFishModal isOpen={createFishModalIsOpen} setState={setCreateFishModalIsOpen}/>
			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
		</div>
	);
};

export default Fishes;
