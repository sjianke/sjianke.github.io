# Path（路径）

## resolve([...paths])

拼接规范绝对路径

```javascript [D:\index.js]
// File: D:\index.js
const path = require('node:path');

path.resolve(__dirname, 'index.js');
// Returns: D:\index.js

path.resolve('/foo/bar', './baz');
// Returns: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// Returns: '/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// If the current working directory is /home/myself/node,
// this returns '/home/myself/node/wwwroot/static_files/gif/image.gif'
```

## spe

获取当前系统分隔符

```javascript
const path = require('node:path');

console.log(path.sep);
// Windows 环境下输出: '\'
// POSIX 环境下输出: '/'
```

## parse(path)

解析路径并返回对象

```javascript
const path = require('node:path');

console.log(path.parse('D:\\test\\index.js'));
/** Returns:
{
  root: 'D:\\', // 根目录
  dir: 'D:\\test', // 路径
  base: 'index.js', // 文件名加后缀
  ext: '.js', // 文件后缀名
  name: 'index' // 文件名
}
 */
```

## basename(path)

获取文件基础名称

```javascript
const path = require('node:path');

console.log(path.basename('D:\\test\\index.js'));
// Returns: index.js
```

## dirname(path)

获取文件路径

```javascript
const path = require('node:path');

console.log(path.dirname('D:\\test\\index.js'));
// Returns: D:\\test
```

## extname(path)

获取文件扩展名

```javascript
const path = require('node:path');

console.log(path.extname('D:\\test\\index.js'));
// Returns: .js
```

## normalize(path)

规范化路径，会保留末尾分隔符。

```javascript
const path = require('node:path');

// POSIX:
path.normalize('/foo/bar//baz/asdf/quux/..');
// Returns: '/foo/bar/baz/asdf'

// Windows: 
path.normalize('C:\\temp\\\\foo\\bar\\..\\');
// Returns: 'C:\temp\foo\'

path.win32.normalize('C:////temp\\\\/\\/\\/foo/bar');
// Returns: 'C:\\temp\\foo\\bar'
```

## join(path)

拼接路径

```javascript
const path = require('node:path');

// POSIX:
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'

// Windows:
console.log(path.join('C:/foo/bar/baz/asdf', 'aaa', './index.js'));
// Returns: 'C:\foo\bar\baz\asdf\aaa\index.js'
```
