# grain-sand-fetch
### 中文 | [English](README.md)
> 基于[grain-sand-data](https://www.npmjs.com/package/grain-sand-data)的网络资源读取类库


## 安装
```shell
npx yarn add grain-sand-fetch
```
## 使用
### 自动判断数据类型 与 数据读取
```ts
import {readFetch, setReadFetchDefault} from 'https://cdn.jsdmirror.cn/npm/grain-sand-fetch/lib/index.web.js'

setReadFetchDefault({
	cache: 'force-cache',   //优先从缓存加载
	maxSize: 1024 * 1024 * 5    //最大5MB,超过将抛出异常(默认限制为100MB)
});

const response = await readFetch('https://gips1.baidu.com/it/u=1658389554,617110073&amp;fm=3028&amp;app=3028&amp;f=JPEG&amp;fmt=auto?w=1280&amp;h=960');

console.log(response)

/*
将打印输出 
{
    "ext": "jpeg",      //扩展名
    "mime": "image/jpeg", //Mime类型
    "blob": {size: 144835, type: 'image/jpeg'},         //原始二进制数据
    "type": 3,          //为BlobTypes.Image
    "result": img       //以读取到的数据生成的 <img> 对象
}
 */

```