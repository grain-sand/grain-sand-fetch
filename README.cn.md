# grain-sand-fetch
### 中文 | [English](README.md)
> 基于[grain-sand-data](https://www.npmjs.com/package/grain-sand-net)的网络资源读取类库


## 安装
```shell
npx yarn add grain-sand-fetch
```
## 使用
### 自动判断数据类型 与 数据读取
```ts
import {readFetch} from 'https://cdn.jsdmirror.cn/npm/grain-sand-fetch/lib/index.web.js'

const response:IResponse = await readFetch('/1.webp');

console.log(response) 

/*
将打印输出 
{
    "ext": "webp",      //扩展名
    "mime": "image/webp", //Mime类型
    "blob": {size: 772, type: 'image/webp'},         //原始二进制数据
    "type": 3,          //为BlobTypes.Image
    "result": img       //以读取到的数据生成的 <img> 对象
}
 */

```