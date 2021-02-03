import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ReactMapGL, {Marker} from 'react-map-gl';
import styles from '../components.module.css';
import {TOKEN_REACT_MAPGL, ICON_REACT_MAPGL} from '../../config';

const SelectLocation = ({location, onSelectLocation}) => {
	const [currentLocation, setCurrentLocation] = useState({
		latitude: location?.latitude || 0,
		longitude: location?.longitude || 0
	});
	const [zoom, setZoom] = useState(10);

	useEffect(() => {
		if (navigator.geolocation) {
			if (!location || (!location.latitude && !location.longitude)) {
				navigator.geolocation.getCurrentPosition(position => {
					if (!location || !location.latitude || !location.longitude) {
						setCurrentLocation({latitude: position.coords.latitude, longitude: position.coords.longitude});
					}
				});
			}
		} else {
			console.error('Gelocation not supported');
		}
	}, [location, onSelectLocation]);

	return (
		<div className={styles.containerCard}>
			<ReactMapGL
				mapboxApiAccessToken={TOKEN_REACT_MAPGL}
				zoom={zoom}
				latitude={currentLocation.latitude}
				longitude={currentLocation.longitude}
				mapStyle="mapbox://styles/mapbox/dark-v9"
				width="100%"
				height="100%"
				onClick={({lngLat}) => onSelectLocation({longitude: lngLat[0], latitude: lngLat[1]})}
				onViewportChange={({zoom, latitude, longitude}) => {
					setZoom(zoom);
					setCurrentLocation({latitude, longitude});
				}}
			>
				{ location && location.latitude && location.longitude && (
					<Marker longitude={location.longitude} latitude={location.latitude}>
						<svg
							height={20}
							viewBox="0 0 24 24"
							style={{
								cursor: 'pointer',
								fill: '#d00',
								stroke: 'none',
								transform: `translate(${-20 / 2}px,${-20}px)`
							}}
						>
							<path d={ICON_REACT_MAPGL}/>
						</svg>
					</Marker>
				)}
			</ReactMapGL>
		</div>
	);
};

SelectLocation.propTypes = {
	onSelectLocation: PropTypes.func.isRequired,
	location: PropTypes.object
};

export default SelectLocation;
