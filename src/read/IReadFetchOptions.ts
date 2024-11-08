export const DefaultMaxSize: number = 1024 * 1024 * 100;

export interface IReadFetchOptions extends RequestInit {

	/**
	 * 当限定了返回类型时,响应数据超出此大小将回抛出 RequestSizeLimitExceededError
	 * 未限定类型时,超出此大小,将仅支持以 ReadableStream 流式数据访问
	 * 默认值为100M
	 */
	maxSize?: number;


}

export type ReadProcessFn = (loadedLength: number, contentLength: number) => void | Promise<void>;

/**
 * 当类型为`URLSearchParams`时,将以`Post`,`Content-Type: application/x-www-form-urlencoded`数据的形式提交;将以`get`请求数据
 * 当类型为`FormData时`,将以`Post`,`Content-Type: multipart/form-data`数据的形式提交;将以`get`请求数据
 * 当类型为`IReadFetchOptions`时，将以`RequestInit`的选项请求.将以`get`请求数据
 * 默认以`get`请求数据
 */
export type ReadFetchOptions = URLSearchParams | FormData | IReadFetchOptions | ReadProcessFn;