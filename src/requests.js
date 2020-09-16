import axios from 'axios';

const API_URL = 'https://241.ip-92-222-68.eu';

export async function createFishCatch(fish) {
	return axios.post(API_URL + '/fishes', fish, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
