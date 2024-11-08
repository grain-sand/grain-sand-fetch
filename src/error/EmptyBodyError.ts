export class EmptyBodyError extends Error {

	constructor(message?: string) {
		super(message || "Empty Body");
	}
}