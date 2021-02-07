import React from 'react';
import {Card, CardContent} from '@material-ui/core';
import PropTypes from 'prop-types';
import TrashIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import styles from '../components.module.css';

const ParameterItem = ({parameter, onDelete}) => {
	return (
		<Card raised className={styles.card}>
			<CardContent className={styles.cardContent}>
				<p>{parameter}</p>

				<IconButton onClick={onDelete}>
					<TrashIcon/>
				</IconButton>
			</CardContent>
		</Card>
	);
};

ParameterItem.propTypes = {
	parameter: PropTypes.string,
	onDelete: PropTypes.func.isRequired
};

export default ParameterItem;
