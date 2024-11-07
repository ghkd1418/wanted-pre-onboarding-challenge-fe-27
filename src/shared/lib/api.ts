import ky from 'ky';
import toast from 'react-hot-toast';

import { authStorage } from './authStorage';

import type { NormalizedOptions, Options } from 'ky';

declare module 'ky' {
	interface Options extends NormalizedOptions {
		showErrorToast?: boolean;
	}
}

const api = ky.create({
	prefixUrl: 'http://localhost:8080',
	headers: {
		'Content-Type': 'application/json',
	},
});

const extendedApi = api.extend({
	hooks: {
		beforeRequest: [
			(request) => {
				const token = authStorage.getAuthToken();
				request.headers.set('Authorization', `Bearer ${token}`);
			},
		],
		afterResponse: [
			async (_request, _options, response) => {
				if (response.ok) {
					return await response.json();
				}
			},
		],
		beforeError: [
			async (error) => {
				const options = error.options as Options;

				if (options.showErrorToast) {
					const errorMessage = (await error.response.json()) as {
						details: string;
					};

					toast.error(errorMessage.details);
					return error;
				}

				console.error('API Error:', error.message);

				return error;
			},
		],
	},
});

export default extendedApi;
