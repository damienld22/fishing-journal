import React from 'react';
import PropTypes from 'prop-types';
import {FormControl, InputLabel, Select} from '@material-ui/core';
import styles from '../components.module.css';

const SelectSessionLocation = ({onSelectLocation, location, availableLocations}) => {
	return (
		<div className={styles.containerSelector}>
			<p className={styles.titleSelector}>Zone de pêche</p>

			<FormControl className={styles.inputSelectorList}>
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

SelectSessionLocation.propTypes = {
	onSelectLocation: PropTypes.func.isRequired,
	location: PropTypes.string,
	availableLocations: PropTypes.arrayOf(PropTypes.object)
};

export default SelectSessionLocation;
