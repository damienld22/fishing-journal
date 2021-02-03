import React from 'react';
import PropTypes from 'prop-types';
import {IconButton} from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from 'react-router-dom';
import DisplayLocationMarker from '../../components/locations/DisplayLocationMarker';
import './DisplayLocation.scss';

const DisplayLocation = ({location}) => {
	const history = useHistory();
	const loc = location?.state?.location;

	return (
		<div className="container">
			<div className="topLine">
				<IconButton onClick={() => history.goBack()}>
					<BackIcon/>
				</IconButton>
			</div>

			<p className="locationName">{loc.name}</p>

			<div className="locationMarker">
				<DisplayLocationMarker location={loc.location}/>
			</div>

			<ul className="infos">
				{ loc.fishInfos && <li>{loc.fishInfos}</li>}
				{ loc.otherInformations && <li>{loc.otherInformations}</li>}
				{ loc.nightFishing && <li>{`Pêche de nuit : ${loc.nightFishing}`}</li>}
			</ul>
		</div>
	);
};

DisplayLocation.propTypes = {
	location: PropTypes.object.isRequired
};

export default DisplayLocation;
