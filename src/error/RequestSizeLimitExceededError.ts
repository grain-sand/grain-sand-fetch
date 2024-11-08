export class RequestSizeLimitExceededError extends Error {

	readonly contentLength:number;
	readonly maxSize:number;

	constructor(contentLength:number,maxSize:number) {
		super(`Request Size Limit Exceeded: ${contentLength} > ${maxSize}`);
		this.contentLength = contentLength;
		this.maxSize = maxSize;
	}

}