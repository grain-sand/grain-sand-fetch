import {IReadFetchOption} from "./IReadFetchOption";
import {ReadFetchType} from "./IResponse";
import {DefaultReadOption, DefaultReadOptionMap} from "./private/parseArgs";

/**
 * 设定所有`readFetch`的默认值
 *
 * 未定义的默认值为`{maxSize: 1024 * 1024 * 100}`
 *
 * @param defaultOption
 */
export function setReadFetchDefault(defaultOption: IReadFetchOption): void;

/**
 * 设定一个或多个指定类型的`readFetch`默认值
 *
 * 默认请求`BlobTypes.Svg,BlobTypes.Base64,BlobTypes,BlobTypes.Bitmap,BlobTypes`类型时的默认值为
 * `{cache: 'force-cache'}`
 *
 * @param defaultOption
 * @param readFetchType
 * @param types
 */
export function setReadFetchDefault(defaultOption: IReadFetchOption, readFetchType: ReadFetchType, ...types: ReadFetchType[]): void;

export function setReadFetchDefault(defaultOption: IReadFetchOption, ...types: ReadFetchType[]): void {
	if(types.length === 0) {
		Object.assign(DefaultReadOption, defaultOption);
		return;
	}
	for (const type of types) {
		DefaultReadOptionMap.set(type, defaultOption);
	}
}

export function getReadFetchDefault(): IReadFetchOption {
	return DefaultReadOption;
}
