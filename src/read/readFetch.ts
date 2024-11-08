import {ReadFetchOptions, ReadProcessFn} from "./IReadFetchOptions";
import {IResponse, ReadFetchTypeEnum} from "./IResponse";
import {
	Base64DataURL,
	BlobTypes,
	getExtensionMime,
	parseMime,
	parseMimeExt,
	readBlob,
	SimpleDataReader
} from "grain-sand-data";
import {parseArgs} from "./private/parseArgs";
import {EmptyBodyError, HttpStatusError, RequestSizeLimitExceededError} from "../error";
import {createFullStream, streamToBlob} from "./private/createFullStream";


const console = (top as any).console;

/**
 *
 * 通过fetch读取数据,返回指定类型的数据,
 * 当`type`为支持的专用类型时,将返回该类型数据,
 * 当`type`为`ReadFetchTypeEnum.Blob`时，将返回`IBlobResponse`
 * 当类型不受支持或超出最大限制数据大小时,将返回`IStreamResponse`
 *
 * - `url` 请求的地址
 * - `type` 可选,当未指定`type`或指定为通用数据类型时,将根据`数据头`和`Content-Type`进行判断
 * - `options` 可选,未指定时,将以`get`请求数据;
 * 当类型为`URLSearchParams`时,将以`Post`,`Content-Type: application/x-www-form-urlencoded`数据的形式提交;
 * 当类型为`FormData时`,将以`Post`,`Content-Type: multipart/form-data`数据的形式提交;
 * 当类型为`IReadFetchOptions`时，将以`RequestInit`的选项请求.
 *
 * - `readProcessFn` 可选,读取进度的回调函数
 *
 * - `throws` 可能抛出`HttpStatusError`
 */
export function readFetch(url: string | URL, type: BlobTypes.Image, options?: ReadFetchOptions, readProcessFn?: ReadProcessFn): Promise<HTMLImageElement>;

export function readFetch(url: string | URL, type: BlobTypes.Bitmap, options?: ReadFetchOptions, readProcessFn?: ReadProcessFn): Promise<ImageBitmap>;

export function readFetch(url: string | URL, type: BlobTypes.Base64, options?: ReadFetchOptions, readProcessFn?: ReadProcessFn): Promise<Base64DataURL>;

export function readFetch(url: string | URL, type: BlobTypes.Svg, options?: ReadFetchOptions, readProcessFn?: ReadProcessFn): Promise<HTMLUnknownElement>;

export function readFetch(url: string | URL, type: BlobTypes.Text, options?: ReadFetchOptions, readProcessFn?: ReadProcessFn): Promise<string>;

export function readFetch(url: string | URL, type: BlobTypes.Html, options?: ReadFetchOptions, readProcessFn?: ReadProcessFn): Promise<Document>;

export function readFetch(url: string | URL, type: BlobTypes.Xml, options?: ReadFetchOptions, readProcessFn?: ReadProcessFn): Promise<XMLDocument>;

export function readFetch(url: string | URL, type: BlobTypes.Json, options?: ReadFetchOptions, readProcessFn?: ReadProcessFn): Promise<any>;

export function readFetch(url: string | URL, type: BlobTypes.SimpleData, options?: ReadFetchOptions, readProcessFn?: ReadProcessFn): Promise<SimpleDataReader>;

export function readFetch(url: string | URL, type: ReadFetchTypeEnum.Blob, options?: ReadFetchOptions, readProcessFn?: ReadProcessFn): Promise<IResponse<Blob>>;

export function readFetch(url: string | URL, type: ReadFetchTypeEnum.Stream, options?: ReadFetchOptions, readProcessFn?: ReadProcessFn): Promise<IResponse<ReadableStream<Uint8Array>>>;

export function readFetch(url: string | URL, options?: ReadFetchOptions, readProcessFn?: ReadProcessFn): Promise<IResponse>;

export async function readFetch(url: string | URL, ...args: any[]): Promise<any> {

	const {options, maxSize, requestType, readProcessFn} = parseArgs(url, args);
	const response = await fetch(url, options);
	if (!response.ok) {
		throw new HttpStatusError(response.status);
	}
	const stringContentLength = response.headers.get('Content-Length');
	const reader: ReadableStreamDefaultReader<Uint8Array> | undefined = response.body?.getReader();
	if (!reader || /^\s*0\s*$/.test(stringContentLength!)) {
		throw new EmptyBodyError();
	}

	const contentType = response.headers.get('Content-Type');
	const contentLength = parseInt(stringContentLength!);
	const isStream = requestType === ReadFetchTypeEnum.Stream;
	if (contentLength > maxSize && !isStream) {
		throw new RequestSizeLimitExceededError(contentLength, maxSize);
	}

	const dataHeader = await reader.read();
	const stream = createFullStream(reader, dataHeader as any, maxSize, readProcessFn);
	const blob = !isStream ? await streamToBlob(stream, contentType as any) : undefined;
	if (requestType as number > 0) {
		return await readBlob(blob!, requestType as any);
	}
	if (!isStream) {
		if (requestType === ReadFetchTypeEnum.Blob) {
			return {
				...await parseMimeExt(dataHeader.value!),
				blob,
				result: blob,
				type: ReadFetchTypeEnum.Blob
			}
		}
		return readBlob(blob!)
	}

	return {
		...await parseMimeExt(dataHeader.value!),
		stream,
		result: stream,
		type: ReadFetchTypeEnum.Stream
	};
}