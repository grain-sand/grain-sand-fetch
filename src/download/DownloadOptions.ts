export interface IDownloadOption {

}

export interface IDownloadTask {
	url: string;
	filename: string;
	savePath?: string;
	headers?: any;
	onProgress?: (progress: number) => void;
}