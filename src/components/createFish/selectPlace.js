import {TextField} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const SelectPlace = ({place, onSelectPlace}) => {
	return (
		<div style={styles.container}>
			<p style={styles.title}>Zone de capture</p>

			<TextField
				style={styles.input}
				label="Zone de capture"
				type="text"
				variant="outlined"
				value={place || ''}
				InputLabelProps={{
					shrink: true
				}}
				onChange={event => onSelectPlace(event.target.value)}
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

SelectPlace.propTypes = {
	onSelectPlace: PropTypes.func.isRequired,
	place: PropTypes.string
};

export default SelectPlace;
