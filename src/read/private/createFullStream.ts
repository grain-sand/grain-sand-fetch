import {ReadProcessFn} from "../IReadFetchOptions";
import {RequestSizeLimitExceededError} from "../../error";

export function createFullStream(reader: ReadableStreamDefaultReader<Uint8Array>, header: ReadableStreamReadValueResult<Uint8Array>, maxSize: number, readProcessFn?: ReadProcessFn): ReadableStream<Uint8Array> {
	let size = 0;
	return new ReadableStream<Uint8Array>({
		async pull(controller) {
			const {done, value} = size === 0 ? header : await reader.read();
			size += value?.byteLength || 0;
			if (size > maxSize) {
				throw new RequestSizeLimitExceededError(size, maxSize);
			}
			if (readProcessFn) {
				await readProcessFn(size, maxSize);
			}
			if (done) {
				controller.close();
			} else {
				controller.enqueue(value);
			}
		}
	})
}

export async function streamToBlob(stream: ReadableStream<Uint8Array>, mime: string): Promise<Blob> {
	const arr: BlobPart[] = [];
	for await (const chunk of stream as any) {
		arr.push(chunk)
	}
	return new Blob(arr, {type: mime});

}