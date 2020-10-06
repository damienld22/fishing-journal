import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from '@material-ui/core';
import styles from '../components.module.css';

const SelectWeight = ({weight, onSelectWeight}) => {
	return (
		<div className={styles.containerSelector}>
			<p className={styles.titleSelector}>Poids</p>

			<TextField defaultValue={weight || ''} className={styles.inputSelector} label="Poids en Kg" variant="outlined" type="number" onChange={event => onSelectWeight(event.target.value)}/>
		</div>
	);
};

SelectWeight.propTypes = {
	weight: PropTypes.string,
	onSelectWeight: PropTypes.func.isRequired
};

export default SelectWeight;
