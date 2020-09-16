import axios from 'axios';

const API_URL = 'http://92.222.68.241:3000';

export async function createFishCatch(fish) {
	return axios.post(API_URL + '/fishes', fish, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
