import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Dialog, MenuItem, Select, TextField} from '@material-ui/core';
import styles from '../components.module.css';

const CreateElementModal = ({isOpen, onValidate, onClose, categories}) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('other');
	const [newCategory, setNewCategory] = useState('');

	const validate = () => {
		const newElement = {name, description, category: category === 'other' ? newCategory : category};
		setName('');
		setDescription('');
		setCategory('other');
		setNewCategory('');
		onValidate(newElement);
	};

	return (
		<Dialog open={isOpen} onClose={onClose}>
			<div className={styles.container} style={{padding: 20}}>
				<p>Création d'un nouvel élément</p>

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

				<TextField
					multiline
					className={styles.inputSelector}
					label="Description"
					type="text"
					variant="outlined"
					value={description || ''}
					InputLabelProps={{
						shrink: true
					}}
					onChange={event => setDescription(event.target.value)}
				/>

				<Select fullWidth value={category} style={{marginTop: 20, marginBottom: 20}} onChange={event => setCategory(event.target.value)}>
					<MenuItem value="other">Autre catégorie</MenuItem>
					{
						categories.map((cat, index) => (
							<MenuItem key={index} value={cat}>{cat}</MenuItem>
						))
					}
				</Select>

				{
					category === 'other' && (
						<TextField
							style={{marginBottom: 20}}
							className={styles.inputSelector}
							label="Nouvelle catégorie"
							type="text"
							variant="outlined"
							value={newCategory || ''}
							InputLabelProps={{
								shrink: true
							}}
							onChange={event => setNewCategory(event.target.value)}
						/>
					)
				}

				<div className={styles.buttons}>
					<Button onClick={() => {
						setName('');
						setDescription('');
						setCategory('other');
						onClose();
					}}
					>Annuler
					</Button>
					<Button onClick={validate}>Créer</Button>
				</div>
			</div>
		</Dialog>
	);
};

CreateElementModal.propTypes = {
	isOpen: PropTypes.bool,
	onValidate: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	categories: PropTypes.array.isRequired
};

export default CreateElementModal;
