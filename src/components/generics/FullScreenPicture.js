import React, {useState, forwardRef} from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import {Dialog, IconButton, Slide} from '@material-ui/core';

const FullScreenPicture = ({src, alt, height}) => {
	const [fullScreen, setFullScreen] = useState(false);

	const Transition = forwardRef((props, ref) => {
		return <Slide ref={ref} direction="up" {...props}/>;
	});

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
					<Dialog fullScreen open={fullScreen} TransitionComponent={Transition} onClose={closeModal}>
						<div style={{height: '100vh'}}>
							<IconButton style={{position: 'absolute', top: '20px', right: '20px'}} onClick={closeModal}>
								<CloseIcon/>
							</IconButton>
							<img alt={alt} src={src} style={{width: '100%', height: '100%', objectFit: 'contain'}}/>
						</div>
					</Dialog>
			}
		</>
	);
};

FullScreenPicture.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	height: PropTypes.number.isRequired
};

export default FullScreenPicture;
