export class HttpStatusError extends Error {

	readonly status: number;

	constructor(status: number, message?: string) {
		super(message || getStatusMessage(status));
		this.status = status;
	}
}

function getStatusMessage(number: number) {
	switch (number) {
		case 400:
			return "Bad Request";
		case 401:
			return "Unauthorized";
		case 403:
			return "Forbidden";
		case 404:
			return "Not Found";
		case 500:
			return "Internal Server Error";
		default:
			return "Unknown Error";
	}
}