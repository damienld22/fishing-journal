import {TextField} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './fishes.module.css';

const SelectBait = ({bait, onSelectBait}) => {
	return (
		<div className={styles.containerSelector}>
			<p className={styles.titleSelector}>Appât</p>

			<TextField
				className={styles.inputSelector}
				label="Appât"
				type="text"
				variant="outlined"
				value={bait || ''}
				InputLabelProps={{
					shrink: true
				}}
				onChange={event => onSelectBait(event.target.value)}
			/>
		</div>
	);
};

SelectBait.propTypes = {
	onSelectBait: PropTypes.func.isRequired,
	bait: PropTypes.string
};

export default SelectBait;
