import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ReactMapGL, {Marker} from 'react-map-gl';
import styles from '../components.module.css';

const token = 'pk.eyJ1IjoiZGFtaWVubGQiLCJhIjoiY2tmbjBncHB4MDZrMDJybXA0cGkwa3cyMCJ9.8BF21fxwSd0lZ_qXptND_Q';
const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
	C20.1,15.8,20.2,15.8,20.2,15.7z`;

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
				mapboxApiAccessToken={token}
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
							<path d={ICON}/>
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
