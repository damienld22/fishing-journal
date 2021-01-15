import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from '../components.module.css';

const SortedList = ({sortedItems, handleChangeCheckbox, handleDeleteItem}) => {
	const [items, setItems] = useState(sortedItems);

	useEffect(() => {
		setItems(sortedItems);
	}, [sortedItems]);

	const onHandleChangeCheckbox = (elt, checked) => {
		const newItems = [...items];
		const category = newItems.find(item => item.category === elt.category);
		const properElement = category.elements.find(element => element._id === elt._id);
		properElement.checked = checked;

		setItems(newItems);
		handleChangeCheckbox(elt, checked);
	};

	const onDeleteItem = elt => {
		const newItems = [...items];
		const category = newItems.find(item => item.category === elt.category);
		category.elements = category.elements.filter(element => element._id !== elt._id);
		setItems(newItems);
		handleDeleteItem(elt);
	};

	return (
		items.map(item => (
			<Accordion key={item.category}>
				<AccordionSummary expandIcon={<ExpandMoreIcon/>} id={item.category}>{item.category}</AccordionSummary>
				<AccordionDetails>
					<div className={styles.accordionDetailsList}>
						{ item.elements.map(elt => (
							<div key={elt._id} className={styles.accordionItemWithDelete}>
								<FormControlLabel
									control={<Checkbox
										checked={elt.checked}
										name={elt.name}
										color="primary"
										onChange={evt => onHandleChangeCheckbox(elt, evt.target.checked)}
									/>} label={elt.name}/>
								<IconButton onClick={() => onDeleteItem(elt)}>
									<DeleteIcon/>
								</IconButton>
							</div>
						))}
					</div>
				</AccordionDetails>
			</Accordion>
		))
	);
};

SortedList.propTypes = {
	sortedItems: PropTypes.arrayOf(PropTypes.object),
	handleChangeCheckbox: PropTypes.func,
	handleDeleteItem: PropTypes.func
};

export default SortedList;
