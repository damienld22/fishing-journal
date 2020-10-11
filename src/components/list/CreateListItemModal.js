import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogTitle, Button, TextField, FormControl, InputLabel, Select} from '@material-ui/core';
import styles from '../components.module.css';

const CreateListItemModal = ({isOpen, onCancel, onNewItem, availableCategories}) => {
	const [name, setName] = useState(null);
	const [category, setCategory] = useState('other');
	const [newCategory, setNewCategory] = useState(null);

	const onHandleCancel = () => {
		setName(null);
		setCategory(null);
		setNewCategory(null);
		onCancel();
	};

	const onValidate = () => {
		onNewItem({name, category: category === 'other' ? newCategory : category});
		setName(null);
		setCategory(null);
		setNewCategory(null);
	};

	return (
		<Dialog fullWidth open={isOpen} maxWidth="xl" onClose={onHandleCancel}>
			<DialogTitle>Nouvel item</DialogTitle>

			<div className={styles.containerSelector}>
				<TextField
					className={styles.inputSelector}
					label="Nom"
					type="text"
					variant="outlined"
					value={name || ''}
					InputLabelProps={{
						shrink: true
					}}
					onChange={event => setName(event.target.value)}
				/>

				<FormControl className={styles.inputSelectorList}>
					<InputLabel htmlFor="category">Categorie</InputLabel>
					<Select
						native
						value={category || ''}
						inputProps={{name: 'category', id: 'category'}}
						onChange={evt => setCategory(evt.target.value)}
					>
						{
							availableCategories.map(category => (
								<option key={category} value={category}>{category}</option>
							))
						}
						<option aria-label="other" value="other">Autre</option>
					</Select>
				</FormControl>

				{ category === 'other' && <TextField
					className={styles.inputSelector}
					label="Nouvelle catégorie"
					type="text"
					variant="outlined"
					value={newCategory || ''}
					InputLabelProps={{
						shrink: true
					}}
					onChange={event => setNewCategory(event.target.value)}
				/>}
			</div>

			<br/>

			<div className={styles.buttons}>
				<Button className={styles.button} onClick={onHandleCancel}>Annuler</Button>
				<Button className={styles.button} onClick={onValidate}>Ajouter</Button>
			</div>
		</Dialog>
	);
};

CreateListItemModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onCancel: PropTypes.func.isRequired,
	onNewItem: PropTypes.func.isRequired,
	availableCategories: PropTypes.arrayOf(PropTypes.string)
};

export default CreateListItemModal;
