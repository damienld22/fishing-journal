import React from 'react';
import PropTypes from 'prop-types';
import {IconButton} from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from 'react-router-dom';
import './DisplayStation.scss';
import FullScreenPicture from '../../components/generics/FullScreenPicture';

const DisplayStation = ({location}) => {
	const history = useHistory();
	const station = location?.state?.station;

	return (
		<div className="container">
			<div className="topLine">
				<IconButton onClick={() => history.goBack()}>
					<BackIcon/>
				</IconButton>
			</div>

			<div style={{margin: '20px'}}>
				{ station.picture && (
					<FullScreenPicture alt="station" height={200} src={station.picture}/>
				)}
			</div>

			<ul className="infos">
				{ station.distance && <li>{`Distance : ${station.distance}m`}</li>}
				{ station.depth && <li>{`Profondeur : ${station.depth}m`}</li>}
				{ station.orientation !== null && <li>{`Orientation : ${station.orientation}°`}</li>}

				{ station.description && (
					<p className="description">{station.description}</p>
				)}
			</ul>
		</div>
	);
};

DisplayStation.propTypes = {
	location: PropTypes.object.isRequired
};

export default DisplayStation;
