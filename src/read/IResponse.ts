import {Base64DataURL, BlobTypes, IExtensionMime} from "grain-sand-data";

export const enum ReadFetchTypeEnum {
	Blob = -1,
	Stream = -2,
}

export type ReadFetchType = BlobTypes | ReadFetchTypeEnum;

export type ResponseResult =
	Blob
	| Base64DataURL
	| HTMLImageElement
	| ImageBitmap
	| HTMLUnknownElement
	| Document
	| XMLDocument
	| ReadableStream<Uint8Array>
	| string;


export interface IResponse<T extends ResponseResult = any> extends Readonly<IExtensionMime> {
	readonly type: BlobTypes
	readonly stream?: ReadableStream
	readonly blob?: Blob
	readonly result: T
	readonly headers: Headers
	readonly contentType: string
}





