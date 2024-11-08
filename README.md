# grain-sand-fetch
### English | [中文](README.cn.md)

> A library for reading web resources based on [grain-sand-data](https://www.npmjs.com/package/grain-sand-net)

## Installation
```shell
npx yarn add grain-sand-fetch
```

## Usage
### Automatic Data Type Detection and Data Reading
```ts
import {readFetch} from 'https://cdn.jsdmirror.cn/npm/grain-sand-fetch/lib/index.web.js'

const response: IResponse = await readFetch('/1.webp');

console.log(response);

/*
Output will be:
{
    "ext": "webp",        // Extension
    "mime": "image/webp", // MIME type
    "blob": {size: 772, type: 'image/webp'}, // Original binary data
    "type": 3,            // Indicates BlobTypes.Image
    "result": img         // <img> object generated from the fetched data
}
 */
```