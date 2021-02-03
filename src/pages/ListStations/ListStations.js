import React from 'react';
import PropTypes from 'prop-types';
import {IconButton} from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';
import {useHistory, useParams} from 'react-router-dom';
import './ListStations.scss';

const ListStations = () => {
	const {location} = useParams();
	const history = useHistory();

	return (
		<div className="container">
			<div className="topLine">
				<IconButton onClick={() => history.goBack()}>
					<BackIcon/>
				</IconButton>
			</div>

			<p>{location}</p>
		</div>
	);
};

ListStations.propTypes = {
	location: PropTypes.object.isRequired
};

export default ListStations;
