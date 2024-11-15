// noinspection ES6UnusedImports
// noinspection JSUnusedLocalSymbols

import {describe, expect, it} from "vitest";
import {logJson} from "grain-sand-base";
import {BlobTypes, parseMimeExt} from "grain-sand-data";
import {readFetch, setReadFetchDefault} from "../dist";

const console = (top as any).console;

describe('read', () => {
	console.clear();
	it('default-setting', async (): Promise<void> => {
		setReadFetchDefault({
			cache: 'force-cache',   //优先从缓存加载
			maxSize: 1024 * 1024 * 5    //最大5MB,超过将抛出异常(默认限制为100MB)
		});
		const response = await readFetch('https://gips1.baidu.com/it/u=1658389554,617110073&amp;fm=3028&amp;app=3028&amp;f=JPEG&amp;fmt=auto?w=1280&amp;h=960');
		console.log(response)
	})
})