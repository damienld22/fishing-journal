import React, {useEffect, useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import {CircularProgress, Button} from '@material-ui/core';
import CreateListItemModal from './CreateListItemModal';
import SortedList from './SortedList';
import {getList, updateList} from '../../requests';
import {sortElementsByCategory} from './utils';
import Snackbar from '../Snackbar';
import styles from '../components.module.css';

const List = () => {
	const [list, setList] = useState({});
	const [addItemModalOpen, setAddItemModalOpen] = useState(false);
	const [availableCategories, setAvailableCategories] = useState([]);
	const [displayProgress, setDisplayProgress] = useState(false);
	const [messageSnackbar, setMessageSnackbar] = useState(null);

	useEffect(() => {
		getList()
			.then(({data}) => {
				setList(data || {});
				if (data && data.elements) {
					data.elements.forEach(elt => {
						setAvailableCategories(previous => {
							if (!previous.includes(elt.category)) {
								return [...previous, elt.category];
							}

							return elt;
						});
					});
				}

				setDisplayProgress(false);
			})
			.catch(() => {
				setMessageSnackbar('Erreur lors de la récupération de la liste.');
				setDisplayProgress(false);
			});
	}, []);

	const handleSave = () => {
		updateList(list)
			.then(() => {
				setDisplayProgress(false);
				setMessageSnackbar('La liste a été mise à jour.');
			})
			.catch(() => {
				setMessageSnackbar('Erreur lors de l\'enregistrement de la liste.');
				setDisplayProgress(false);
			});
	};

	const handleChangeCheckbox = (item, checked) => {
		const indexElt = list.elements.findIndex(elt => elt.id === item.id);

		if (indexElt > -1) {
			const newElts = [...list.elements];
			newElts[indexElt] = Object.assign({}, list.elements[indexElt], {checked});

			setList(list => {
				list.elements = newElts;
				return list;
			});
		}
	};

	const handleDeleteItem = item => {
		const newList = Object.assign(list);
		newList.elements = newList.elements.filter(elt => elt.id !== item.id);
		setList(newList);
	};

	const onNewItem = item => {
		setList(list => {
			const newElements = [];
			if (list && list.elements) {
				newElements.push(...list.elements);
			}

			newElements.push({...item, checked: false, id: Math.random().toString(36).slice(2, 12)});
			list.elements = newElements;
			return list;
		});
		if (!availableCategories.includes(item.category)) {
			setAvailableCategories(previous => [...previous, item.category]);
		}

		setAddItemModalOpen(false);
	};

	return (
		<div className={styles.container}>
			<h1>Liste de pêche</h1>

			<Button className={styles.saveButton} onClick={handleSave}>Enregistrer</Button>

			<div className={styles.scrollList}>
				{ list && list.elements && <SortedList
					sortedItems={sortElementsByCategory(list.elements)}
					handleChangeCheckbox={handleChangeCheckbox}
					handleDeleteItem={handleDeleteItem}/>}
			</div>

			<CreateListItemModal availableCategories={availableCategories} isOpen={addItemModalOpen} onCancel={() => setAddItemModalOpen(false)} onNewItem={onNewItem}/>

			<IconButton className={styles.addButton} onClick={() => setAddItemModalOpen(true)}>
				<AddIcon/>
			</IconButton>

			{ displayProgress && <CircularProgress className={styles.progress}/>}
			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
		</div>
	);
};

export default List;
