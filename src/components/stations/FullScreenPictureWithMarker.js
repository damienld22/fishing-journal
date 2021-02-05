import React, {useState} from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import {Button, Dialog, IconButton} from '@material-ui/core';
import MarkerIcon from '@material-ui/icons/GpsNotFixed';
import ImageMarker from 'react-image-marker';

const CustomMarker = () => <MarkerIcon color="error"/>;

const FullScreenPictureWithMarker = ({src, alt, height, markers, onSelectMarkers}) => {
	const [fullScreen, setFullScreen] = useState(false);
	const [currentMarkers, setCurrentMarkers] = useState(markers);

	const onClick = evt => {
		evt.stopPropagation();
		setFullScreen(true);
	};

	const closeModal = evt => {
		evt.stopPropagation();
		setFullScreen(false);
	};

	return (
		<>
			<img alt={alt} src={src} height={height} onClick={onClick}/>
			{
				fullScreen &&
					<Dialog fullScreen open={fullScreen} onClose={closeModal}>
						<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px'}}>
							<IconButton style={{zIndex: 99, position: 'absolute', top: '20px', right: '20px'}} onClick={closeModal}>
								<CloseIcon/>
							</IconButton>
							{src && (
								<div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '50%', transform: 'translateY(-50%)'}}>
									<ImageMarker style={{maxWidth: '80vw'}} src={src} markers={currentMarkers} markerComponent={CustomMarker} onAddMarker={marker => setCurrentMarkers([marker])}/>
								</div>
							)}
							<Button
								color="primary" style={{marginTop: 100}} onClick={() => {
									onSelectMarkers(currentMarkers);
									setFullScreen(false);
								}}
							>Valider
							</Button>
						</div>
					</Dialog>
			}
		</>
	);
};

FullScreenPictureWithMarker.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string.isRequired,
	height: PropTypes.number.isRequired,
	markers: PropTypes.array.isRequired,
	onSelectMarkers: PropTypes.func.isRequired
};

export default FullScreenPictureWithMarker;
