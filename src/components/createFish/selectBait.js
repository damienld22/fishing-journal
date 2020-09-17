import {TextField} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const SelectBait = ({bait, onSelectBait}) => {
	return (
		<div style={styles.container}>
			<p style={styles.title}>Appât</p>

			<TextField
				style={styles.input}
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

SelectBait.propTypes = {
	onSelectBait: PropTypes.func.isRequired,
	bait: PropTypes.string
};

export default SelectBait;
