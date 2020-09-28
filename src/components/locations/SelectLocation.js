import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';

const SelectLocation = ({location, onSelectLocation}) => {
	const [zoom, setZoom] = useState(10);

	useEffect(() => {
		if (navigator.geolocation) {
			if (!location || (!location.latitude && !location.longitude)) {
				navigator.geolocation.getCurrentPosition(position => {
					onSelectLocation({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					});
				});
			}
		} else {
			console.error('Gelocation not supported');
		}
	}, []);

	return (
		<div style={styles.container}>
			<Map
				center={[location ? location.latitude : 0, location ? location.longitude : 0]} zoom={zoom} onBoundsChanged={({zoom}) => setZoom(zoom)}
				onClick={({latLng}) => {
					onSelectLocation({latitude: latLng[0], longitude: latLng[1]});
				}}
			>
				<Marker anchor={[location ? location.latitude : 0, location ? location.longitude : 0]} payload={1}/>
			</Map>
		</div>
	);
};

const styles = {
	container: {
		paddingLeft: 20,
		paddingRight: 20,
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start'
	}
};

SelectLocation.propTypes = {
	onSelectLocation: PropTypes.func.isRequired,
	location: PropTypes.object
};

export default SelectLocation;
