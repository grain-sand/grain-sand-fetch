# grain-sand-fetch
### English | [中文](README.cn.md)
> A library for reading web resources based on [grain-sand-data](https://www.npmjs.com/package/grain-sand-data).

## Installation
```shell  
npx yarn add grain-sand-fetch  
```  

## Usage
### Auto-detect Data Types and Read Data
```ts  
import {readFetch, setReadFetchDefault} from 'https://cdn.jsdmirror.cn/npm/grain-sand-fetch/lib/index.web.js'  

setReadFetchDefault({  
    cache: 'force-cache',   // Prioritize loading from cache  
    maxSize: 1024 * 1024 * 5    // Maximum size 5MB, exceeding this will throw an exception (default limit is 100MB)  
});  

const response = await readFetch('https://gips1.baidu.com/it/u=1658389554,617110073&amp;fm=3028&amp;app=3028&amp;f=JPEG&amp;fmt=auto?w=1280&amp;h=960');  

console.log(response);  

/*  
Outputs:  
{  
    "ext": "jpeg",      // File extension  
    "mime": "image/jpeg", // Mime type  
    "blob": {size: 144835, type: 'image/jpeg'},         // Original binary data  
    "type": 3,          // Corresponds to BlobTypes.Image  
    "result": img       // Generated <img> object from the data  
}  
*/  
```  