import {ReadFetchType} from "../IResponse";
import {isFunction, isNumber, isObject} from "grain-sand-base";
import {IReadFetchOption, ReadProcessFn} from "../IReadFetchOption";
import {BlobTypes, MimeTypes} from "grain-sand-data";

export const DefaultMaxSize: number = 1024 * 1024 * 100;

export const DefaultReadOption: IReadFetchOption = {};

export const DefaultReadOptionMap: Map<ReadFetchType | undefined, IReadFetchOption> = new Map();

let initializedDefaultOption: boolean;

const bitmapAccept = [MimeTypes.PNG, MimeTypes.JPEG, MimeTypes.GIF, MimeTypes.WebP];

const AcceptMap: Map<BlobTypes, string[]> = new Map([
	[BlobTypes.Json, [MimeTypes.JSON]],
	[BlobTypes.Bitmap, bitmapAccept],
	[BlobTypes.Image, [...bitmapAccept, MimeTypes.SVG, "image/*"]],
	[BlobTypes.Xml, [MimeTypes.XML]],
	[BlobTypes.Svg, [MimeTypes.SVG]],
]);

export interface IParsedArgs {
	option: IReadFetchOption,
	maxSize: number,
	requestType?: ReadFetchType,
	readProcessFn?: ReadProcessFn
}


export function parseArgs(url: string | URL, args: any[]): Readonly<IParsedArgs> {
	let i = 0;
	const requestType: ReadFetchType | undefined = isNumber(args[i]) ? args[i++] as ReadFetchType : undefined;
	const defaultOptions = {...DefaultReadOption, ...DefaultReadOptionMap.get(requestType)}
	let params: any = args[i] instanceof URLSearchParams ? args[i++] as URLSearchParams : undefined;
	let formData = args[i] instanceof FormData ? args[i++] as FormData : undefined;
	const option = checkOptions(isObject(args[i]) ? {...defaultOptions, ...args[i++]} : {...defaultOptions}, url, params, formData);
	const readProcessFn: ReadProcessFn | undefined = isFunction(args[i]) ? args[i++] as ReadProcessFn : undefined;
	const maxSize = option.maxSize > 0 ? option.maxSize : DefaultMaxSize;
	'maxSize' in option && delete option.maxSize;
	if (!option.headers['Accept'] && AcceptMap.has(requestType as any)) {
		(option.headers['Accept'] = AcceptMap.get(requestType as any));
	}
	return {
		requestType,
		option,
		readProcessFn,
		maxSize
	}
}

function checkOptions(options: IReadFetchOption | any, url: string | URL, params?: URLSearchParams, formData?: FormData): any {
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

export function checkInitDefault() {
	if (initializedDefaultOption) return;
	initializedDefaultOption = true;
	isNaN(DefaultReadOption.maxSize!) && (DefaultReadOption.maxSize = DefaultMaxSize);
	const cacheOption: IReadFetchOption = {cache: 'force-cache'};
	for (const type of [BlobTypes.Image, BlobTypes.Image, BlobTypes.Svg, BlobTypes.Base64]) {
		DefaultReadOptionMap.has(type) || DefaultReadOptionMap.set(type, cacheOption);
	}
}