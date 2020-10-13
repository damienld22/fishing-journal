import React, {useEffect, useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import {getReferences, deleteReference} from '../../requests';
import Snackbar from '../Snackbar';
import {CircularProgress} from '@material-ui/core';
import CreateReferenceModal from './CreateReferenceModal';
import styles from '../components.module.css';
import SortedListReferences from './SortedListReferences';
import {sortElementsByCategory} from '../list/utils';
import EditReferenceModal from './EditReferenceModal';

const References = () => {
	const [createReferenceModalIsOpen, setCreateReferenceModalIsOpen] = useState(false);
	const [references, setReferences] = useState([]);
	const [availableCategories, setAvailableCategories] = useState([]);
	const [selectedReference, setSelectedReference] = useState(null);
	const [displayProgress, setDisplayProgress] = useState(false);
	const [messageSnackbar, setMessageSnackbar] = useState(null);

	function getReferencesFromServer() {
		getReferences()
			.then(({data}) => {
				setReferences(data);
				setDisplayProgress(false);
				setAvailableCategories(previous => {
					const newCategories = [...previous];
					data.forEach(elt => {
						if (!newCategories.includes(elt.category)) {
							newCategories.push(elt.category);
						}
					});
					return newCategories;
				});
			})
			.catch(() => {
				setMessageSnackbar('Erreur lors de la récupération des références.');
				setDisplayProgress(false);
			});
	}

	const handleDeleteReference = item => {
		setDisplayProgress(true);
		deleteReference(item._id)
			.then(() => {
				setDisplayProgress(false);
				let newReferences = [...references];
				newReferences = newReferences.filter(elt => elt._id !== item._id);
				setReferences(newReferences);
			})
			.catch(() => {
				setMessageSnackbar('Erreur lors de la suppression de la référence.');
				setDisplayProgress(false);
			});
	};

	useEffect(() => {
		if (!createReferenceModalIsOpen || !selectedReference) {
			setDisplayProgress(true);
			getReferencesFromServer();
		}
	}, [createReferenceModalIsOpen, selectedReference]);

	return (
		<div className={styles.container}>
			<h1>Mes références</h1>

			<div className={styles.scrollList}>
				{ references && <SortedListReferences
					sortedItems={sortElementsByCategory(references)}
					handleDeleteItem={handleDeleteReference}
					onEdit={setSelectedReference}/>}
			</div>

			<IconButton className={styles.addButton} onClick={() => setCreateReferenceModalIsOpen(true)}>
				<AddIcon/>
			</IconButton>

			{ displayProgress && <CircularProgress className={styles.progress}/>}
			<CreateReferenceModal isOpen={createReferenceModalIsOpen} setState={setCreateReferenceModalIsOpen} availableCategories={availableCategories}/>
			{ selectedReference && <EditReferenceModal reference={selectedReference} isOpen={Boolean(selectedReference)} setState={setSelectedReference} availableCategories={availableCategories}/>}
			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
		</div>
	);
};

export default References;
