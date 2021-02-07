import axios from 'axios';
import urljoin from 'url-join';
import {API_URL} from './config';

/**
 * ======================================
 *  Fishes
 * ======================================
 */
export async function createFishCatch(fish, picture) {
	// Upload the picture
	const formData = new FormData();
	formData.append('file', picture);
	const {data: uploadResponse} = await axios.post(API_URL + '/fishes/picture', formData, {
		headers: {
			'content-type': 'multipart/form-data',
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});

	const fishWithPicture = Object.assign({}, fish, {picture: urljoin(API_URL, uploadResponse.data.filename)});
	return axios.post(API_URL + '/fishes', fishWithPicture, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

export async function getFishCatch() {
	return axios.get(API_URL + '/fishes', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

export async function updateFishCatch(id, fish, newPicture) {
	let newFish = fish;
	if (newPicture) {
		// Upload the picture
		const formData = new FormData();
		formData.append('file', newPicture);
		const {data: uploadResponse} = await axios.post(API_URL + '/fishes/picture', formData, {
			headers: {
				'content-type': 'multipart/form-data',
				Authorization: `Bearer ${localStorage.getItem('access_token')}`
			}
		});
		newFish = Object.assign({}, fish, {picture: urljoin(API_URL, uploadResponse.data.filename)});
	}

	return axios.put(API_URL + '/fishes/' + id, newFish, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

export async function deleteFishCatch(id) {
	return axios.delete(API_URL + '/fishes/' + id, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

/**
 * ======================================
 *  Locations
 * ======================================
 */
export async function getLocations() {
	return axios.get(API_URL + '/locations', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

export async function createLocation(location) {
	return axios.post(API_URL + '/locations', location, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

export async function deleteLocation(id) {
	return axios.delete(API_URL + '/locations/' + id, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

export async function updateLocation(id, location) {
	return axios.put(API_URL + '/locations/' + id, location, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

/**
 * ======================================
 *  Stations
 * ======================================
 */
export async function getStationsByLocation(location) {
	return axios.get(API_URL + '/stations', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		},
		params: {
			location
		}
	});
}

export async function createStation(station, picture) {
	// Upload the picture
	const formData = new FormData();
	formData.append('file', picture);
	const {data: uploadResponse} = await axios.post(API_URL + '/stations/picture', formData, {
		headers: {
			'content-type': 'multipart/form-data',
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});

	const stationWithPicture = Object.assign({}, station, {picture: urljoin(API_URL, uploadResponse.data.filename)});
	return axios.post(API_URL + '/stations', stationWithPicture, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

export async function deleteStation(id) {
	return axios.delete(API_URL + '/stations/' + id, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

export async function updateStation(id, station, newPicture) {
	let newStation = station;
	if (newPicture) {
		// Upload the picture
		const formData = new FormData();
		formData.append('file', newPicture);
		const {data: uploadResponse} = await axios.post(API_URL + '/stations/picture', formData, {
			headers: {
				'content-type': 'multipart/form-data',
				Authorization: `Bearer ${localStorage.getItem('access_token')}`
			}
		});
		newStation = Object.assign({}, station, {picture: urljoin(API_URL, uploadResponse.data.filename)});
	}

	return axios.put(API_URL + '/stations/' + id, newStation, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

/**
 * ======================================
 *  Sessions
 * ======================================
 */
export async function getSessions() {
	return axios.get(API_URL + '/sessions', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

export async function getSessionWithDetails(id) {
	return axios.get(API_URL + '/sessions/' + id + '/details', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

export async function deleteSession(id) {
	return axios.delete(API_URL + '/sessions/' + id, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

export async function createSession(session) {
	return axios.post(API_URL + '/sessions', session, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

export async function updateSession(id, session) {
	return axios.put(API_URL + '/sessions/' + id, session, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

/**
 * ======================================
 *  List
 * ======================================
 */
export async function updateList(list) {
	return axios.post(API_URL + '/list', list, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

export async function getList() {
	return axios.get(API_URL + '/list', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

/**
 * ======================================
 *  Decision help
 * ======================================
 */
export async function updateDecisionHelp(decisionHelp) {
	return axios.post(API_URL + '/decisionHelp', decisionHelp, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

export async function getDecisionHelp() {
	return axios.get(API_URL + '/decisionHelp', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

/**
 * ======================================
 *  References
 * ======================================
 */
export async function getReferences() {
	return axios.get(API_URL + '/references', {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

export async function createReference(reference) {
	return axios.post(API_URL + '/references', reference, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

export async function deleteReference(id) {
	return axios.delete(API_URL + '/references/' + id, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

export async function updateReference(id, reference) {
	return axios.put(API_URL + '/references/' + id, reference, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('access_token')}`
		}
	});
}

/**
 * ======================================
 *  Authentication
 * ======================================
 */
export async function authenticate(username, password) {
	return axios.post(API_URL + '/login', {username, password}, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export async function signup(username, password) {
	return axios.post(API_URL + '/sign-up', {username, password}, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
