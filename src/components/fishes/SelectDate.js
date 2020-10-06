import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from '@material-ui/core';
import moment from 'moment';
import styles from './fishes.module.css';

const SelectDate = ({onSelectDate, date}) => {
	const formatCurrent = timestamp => {
		return moment.unix(timestamp).format('YYYY-MM-DD') + 'T' + moment.unix(timestamp).format('HH:mm');
	};

	const onUpdateDate = value => {
		onSelectDate(moment(value.target.value).unix());
	};

	return (
		<div className={styles.containerSelector}>
			<p className={styles.titleSelector}>Date de capture</p>

			<TextField
				className={styles.inputSelector}
				label="Date de capture"
				type="datetime-local"
				value={formatCurrent(date || Date.now())}
				InputLabelProps={{
					shrink: true
				}}
				onChange={onUpdateDate}
			/>
		</div>
	);
};

SelectDate.propTypes = {
	onSelectDate: PropTypes.func.isRequired,
	date: PropTypes.number
};

export default SelectDate;
