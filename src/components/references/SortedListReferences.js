import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Accordion, AccordionDetails, AccordionSummary, DialogContentText, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from '../components.module.css';

const SortedListReferences = ({sortedItems, handleDeleteItem, onEdit}) => {
	const [toDelete, setToDelete] = useState(false);
	const [items, setItems] = useState(sortedItems);

	useEffect(() => {
		setItems(sortedItems);
	}, [sortedItems]);

	return (
		items.map(item => (
			<Accordion key={item.category}>
				<AccordionSummary expandIcon={<ExpandMoreIcon/>} id={item.category}>{item.category}</AccordionSummary>
				<AccordionDetails>
					<div className={styles.accordionDetailsList}>
						{ item.elements.map(elt => (
							<div key={elt._id} className={styles.accordionItemWithDelete}>
								<a rel="noopener noreferrer" target="_blank" href={elt.link}>{elt.name}</a>

								<div>
									<IconButton onClick={() => onEdit(elt)}>
										<EditIcon/>
									</IconButton>
									<IconButton onClick={() => setToDelete(elt)}>
										<DeleteIcon/>
									</IconButton>
								</div>
							</div>
						))}
					</div>
				</AccordionDetails>

				<Dialog open={Boolean(toDelete)} onClose={() => setToDelete(null)}>
					<DialogTitle>Suppression de la référence</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Voulez-vous réllement supprimer cette référence ?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button color="primary" onClick={() => setToDelete(null)}>
							Non
						</Button>
						<Button
							autoFocus color="primary" onClick={() => {
								handleDeleteItem(toDelete);
								setToDelete(null);
							}}
						>
							Oui
						</Button>
					</DialogActions>
				</Dialog>
			</Accordion>
		))
	);
};

SortedListReferences.propTypes = {
	sortedItems: PropTypes.arrayOf(PropTypes.object),
	handleChangeCheckbox: PropTypes.func,
	handleDeleteItem: PropTypes.func,
	onEdit: PropTypes.func
};

export default SortedListReferences;
