import axios from 'axios';

const API_URL = 'https://241.ip-92-222-68.eu';

export async function createFishCatch(fish) {
	return axios.post(API_URL + '/fishes', fish, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export async function getFishCatch() {
	return axios.get(API_URL + '/fishes');
}

export async function deleteFishCatch(id) {
	return axios.delete(API_URL + '/fishes/' + id);
}

export async function getLocations() {
	return axios.get(API_URL + '/locations');
}

export async function createLocation(location) {
	return axios.post(API_URL + '/locations', location, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export async function deleteLocation(id) {
	return axios.delete(API_URL + '/locations/' + id);
}

export async function updateLocation(id, location) {
	return axios.put(API_URL + '/locations/' + id, location, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
