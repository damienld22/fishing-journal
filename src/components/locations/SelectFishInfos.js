import {TextField} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../components.module.css';

const SelectFishInfos = ({fishInfos, onSelectFishInfos}) => {
	return (
		<div className={styles.containerSelector}>
			<p className={styles.titleSelector}>Population</p>

			<TextField
				multiline
				className={styles.inputSelector}
				label="Population"
				type="text"
				variant="outlined"
				value={fishInfos || ''}
				InputLabelProps={{
					shrink: true
				}}
				onChange={event => onSelectFishInfos(event.target.value)}
			/>
		</div>
	);
};

SelectFishInfos.propTypes = {
	onSelectFishInfos: PropTypes.func.isRequired,
	fishInfos: PropTypes.string
};

export default SelectFishInfos;
