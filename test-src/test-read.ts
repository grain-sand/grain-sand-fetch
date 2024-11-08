// noinspection ES6UnusedImports
// noinspection JSUnusedLocalSymbols

import {describe, expect, it} from "vitest";
import {logJson} from "grain-sand-base";
import {readFetch} from "../src";
import {BlobTypes, parseMimeExt} from "grain-sand-data";

const console = (top as any).console;

describe('read', () => {
	console.clear();
	it('default-setting', async (): Promise<void> => {
		const response = await readFetch('/1.webp');
		console.log(response)
		// const blob = await fetch('/1.webp').then(r=>r.blob());
		// console.log(await parseMimeExt(blob))


	})
})