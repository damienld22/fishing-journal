import React, {useEffect, useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CreateFishModal from './CreateFishModal';
import {getFishCatch, deleteFishCatch} from '../../requests';
import Snackbar from '../Snackbar';
import FishItem from './FishItem';
import {List, CircularProgress} from '@material-ui/core';
import EditFishModal from './EditFishModal';
import styles from '../components.module.css';

const Fishes = () => {
	const [createFishModalIsOpen, setCreateFishModalIsOpen] = useState(false);
	const [fishes, setFishes] = useState([]);
	const [selectedFish, setSelectedFish] = useState(null);
	const [displayProgress, setDisplayProgress] = useState(false);
	const [messageSnackbar, setMessageSnackbar] = useState(null);

	const handleDeleteFishItem = fish => {
		setDisplayProgress(true);
		deleteFishCatch(fish._id)
			.then(() => {
				setFishes(previous => previous.filter(elt => elt._id !== fish._id));
				setDisplayProgress(false);
			})
			.catch(() => {
				setMessageSnackbar('Erreur lors de la suppression de la capture.');
				setDisplayProgress(false);
			});
	};

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

			<div className={styles.scrollList}>
				<List>
					{
						fishes.map(fish => (
							<FishItem
								key={fish._id}
								fish={fish}
								onClick={() => {}}
								onEdit={() => setSelectedFish(fish)}
								onDeleteItem={handleDeleteFishItem}/>
						))
					}
				</List>
			</div>

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
