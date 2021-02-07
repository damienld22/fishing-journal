import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Card, CardContent, IconButton} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TrashIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import styles from '../components.module.css';

const ElementsByCategoryItem = ({element, onDelete}) => {
	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon/>}
			>
				<p>{element.category}</p>
			</AccordionSummary>
			<AccordionDetails>
				<div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
					{element.elts.map((elt, index) => (
						<Card key={index} raised style={{borderRadius: '10px', marginBottom: 10}}>
							<CardContent className={styles.cardContent} style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
								<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
									<p style={{fontWeight: 'bold'}}>{elt.name}</p>
									<IconButton onClick={() => onDelete(index, element.category)}>
										<TrashIcon/>
									</IconButton>
								</div>
								<p style={{whiteSpace: 'pre-line'}}>{elt.description}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</AccordionDetails>
		</Accordion>
	);
};

ElementsByCategoryItem.propTypes = {
	element: PropTypes.object,
	onDelete: PropTypes.func.isRequired
};

export default ElementsByCategoryItem;
