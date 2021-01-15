import React from 'react';
import PropTypes from 'prop-types';
import {IconButton} from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from 'react-router-dom';
import moment from 'moment';
import FullScreenPicture from '../../components/generics/FullScreenPicture';
import './DisplayFish.scss';

const DisplayFish = ({location}) => {
	const history = useHistory();
	const fish = location?.state?.fish;

	return (
		<div className="container">
			<div className="topLine">
				<IconButton onClick={() => history.goBack()}>
					<BackIcon/>
				</IconButton>
			</div>

			<div>
				{ fish.picture && (
					<FullScreenPicture alt="catch" height={200} src={fish.picture}/>
				)}
			</div>

			{ fish.catchDate && (<p>{moment.unix(fish.catchDate).format('LLL')}</p>)}
			{ fish.weight && (<p className="weight">{`${fish.weight} kg`}</p>)}
			{ fish.bait && (<p className="bait">{fish.bait}</p>)}
			{ fish.place && (<p className="place">{fish.place}</p>)}
		</div>
	);
};

DisplayFish.propTypes = {
	location: PropTypes.object.isRequired
};

export default DisplayFish;
