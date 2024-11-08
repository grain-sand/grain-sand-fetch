import {ReadNetType} from "../IResponse";
import {isFunction, isNumber, isObject} from "grain-sand-base";
import {DefaultMaxSize, IReadFetchOptions, ReadProcessFn} from "../IReadFetchOptions";
import {BlobTypes, MimeTypes} from "grain-sand-data";

const bitmapAccept = [MimeTypes.SVG, MimeTypes.PNG, MimeTypes.JPEG, MimeTypes.GIF, MimeTypes.WebP];

const AcceptMap: Map<BlobTypes, string[]> = new Map([
	[BlobTypes.Json, [MimeTypes.JSON]],
	[BlobTypes.Bitmap, bitmapAccept],
	[BlobTypes.Image, [MimeTypes.SVG, ...bitmapAccept, "image/*"]],
	[BlobTypes.Xml, [MimeTypes.XML]],
	[BlobTypes.Svg, [MimeTypes.SVG]],
]);

export interface IParsedArgs {
	options: IReadFetchOptions,
	maxSize: number,
	requestType?: ReadNetType,
	readProcessFn?: ReadProcessFn
}

export function parseArgs(url: string | URL, args: any[]): Readonly<IParsedArgs> {
	let i = 0;
	const requestType: ReadNetType | undefined = isNumber(args[i]) ? args[i++] as ReadNetType : undefined;
	let params: any = args[i] instanceof URLSearchParams ? args[i++] as URLSearchParams : undefined;
	let formData = args[i] instanceof FormData ? args[i++] as FormData : undefined;
	const options = checkOptions(isObject(args[i]) ? args[i++] : {}, url, params, formData);
	const readProcessFn = isFunction(args[i]) ? args[i++] as ReadProcessFn : undefined;
	const maxSize = isNumber(options.maxSize) ? options.maxSize as number : DefaultMaxSize;
	delete options.maxSize;
	if (!options.headers['Accept'] && AcceptMap.has(requestType as any)) {
		(options.headers['Accept'] = AcceptMap.get(requestType as any));
	}
	return {
		requestType,
		options,
		readProcessFn,
		maxSize
	}
}

function checkOptions(options: IReadFetchOptions | any, url: string | URL, params?: URLSearchParams, formData?: FormData): any {
	//数据体
	if (options.body) {
		if (options.body instanceof FormData) {
			formData = options.body
		} else {
			params = options.body;
		}
	} else options.body = (params || formData);
	(options.body && !options.method) && (options.method = "POST");
	options.referrer = `${url}`;

	//请求头设置
	options.headers || (options.headers = {})
	const {headers} = options;
	params && !headers["Content-Type"] && (headers["Content-Type"] = "application/x-www-form-urlencoded");
	formData && !headers!["Content-Type"] && (headers!["Content-Type"] = "multipart/form-data");

	return options;
}