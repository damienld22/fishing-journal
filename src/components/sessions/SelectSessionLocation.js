import React from 'react';
import PropTypes from 'prop-types';
import {FormControl, InputLabel, Select} from '@material-ui/core';

const SelectSessionLocation = ({onSelectLocation, location, availableLocations}) => {
	return (
		<div style={styles.container}>
			<p style={styles.title}>Zone de pêche</p>

			<FormControl style={styles.input}>
				<InputLabel htmlFor="location-session">Zone de pêche</InputLabel>
				<Select
					native
					value={location || ''}
					inputProps={{name: 'location', id: 'location-session'}}
					onChange={evt => onSelectLocation(evt.target.value)}
				>
					{
						availableLocations.map(location => (
							<option key={location._id} value={location._id}>{location.name}</option>
						))
					}
					<option aria-label="None" value=""/>
				</Select>
			</FormControl>
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
		minWidth: 200,
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

SelectSessionLocation.propTypes = {
	onSelectLocation: PropTypes.func.isRequired,
	location: PropTypes.string,
	availableLocations: PropTypes.arrayOf(PropTypes.object)
};

export default SelectSessionLocation;
