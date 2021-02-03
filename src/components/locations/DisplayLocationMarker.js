import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {ICON_REACT_MAPGL, TOKEN_REACT_MAPGL} from '../../config';
import ReactMapGL, {Marker} from 'react-map-gl';

const DisplayLocationMarker = ({location}) => {
	const [zoom, setZoom] = useState(10);
	const [currentLocation, setCurrentLocation] = useState({
		latitude: location?.latitude || 0,
		longitude: location?.longitude || 0
	});

	return (
		<ReactMapGL
			mapboxApiAccessToken={TOKEN_REACT_MAPGL}
			zoom={zoom}
			latitude={currentLocation.latitude}
			longitude={currentLocation.longitude}
			mapStyle="mapbox://styles/mapbox/dark-v9"
			width="100%"
			height="100%"
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
	);
};

DisplayLocationMarker.propTypes = {
	location: PropTypes.object.isRequired
};

export default DisplayLocationMarker;
