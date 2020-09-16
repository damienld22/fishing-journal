import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from '@material-ui/core';
import moment from 'moment';

const SelectDate = ({onSelectDate, date}) => {
	moment.locale('fr');

	const formatCurrent = timestamp => {
		return moment(timestamp).format('YYYY-MM-DD') + 'T' + moment(timestamp).format('HH:mm');
	};

	const onUpdateDate = value => {
		onSelectDate(moment(value.target.value).unix());
	};

	return (
		<div style={styles.container}>
			<p style={styles.title}>Date de capture</p>

			<TextField
				style={styles.input}
				label="Date de capture"
				type="datetime-local"
				value={formatCurrent(date * 1000 || Date.now())}
				InputLabelProps={{
					shrink: true
				}}
				onChange={onUpdateDate}
			/>
		</div>
	);
};

const styles = {
	title: {
		fontSize: '1.5em',
		fontWeight: 'bold',
		fontStyle: 'italic'
	},
	input: {
		marginTop: 20
	},
	container: {
		paddingLeft: 20,
		paddingRight: 20,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start'
	}
};

SelectDate.propTypes = {
	onSelectDate: PropTypes.func.isRequired,
	date: PropTypes.number
};

export default SelectDate;
