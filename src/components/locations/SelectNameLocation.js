import {TextField} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const SelectNameLocation = ({nameLocation, onSelectNameLocation}) => {
	return (
		<div style={styles.container}>
			<p style={styles.title}>Nom</p>

			<TextField
				style={styles.input}
				label="Nom"
				type="text"
				variant="outlined"
				value={nameLocation || ''}
				InputLabelProps={{
					shrink: true
				}}
				onChange={event => onSelectNameLocation(event.target.value)}
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

SelectNameLocation.propTypes = {
	onSelectNameLocation: PropTypes.func.isRequired,
	nameLocation: PropTypes.string
};

export default SelectNameLocation;
