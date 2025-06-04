# Node.js Path 模块使用指南

文档基于 Node.js 官方文档：https://nodejs.org/api/path.html

[File system | Node.js v24.0.2 Documentation](https://nodejs.org/api/fs.html)

## 1. 引入模块

```javascript
const path = require('node:path');
```

## 2. path.resolve(...paths)

将路径片段组合成绝对路径（从右向左处理，直到构造出绝对路径为止）

```javascript [D:\index.js]
path.resolve(__dirname, 'index.js');
// 返回: 绝对路径

path.resolve('/foo/bar', './baz');
// 返回: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// 返回: '/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// 假设当前工作目录为 /home/user/node，返回:
// '/home/user/node/wwwroot/static_files/gif/image.gif'
```

## 3. path.sep

获取当前系统路径分隔符：

```javascript
console.log(path.sep);
// Windows: '\'
// POSIX: '/'
```

## 4. path.parse(path)

解析路径为一个对象：

```javascript
console.log(path.parse('D:\\test\\index.js'));
/** 返回：
{
  root: 'D:\\',
  dir: 'D:\\test',
  base: 'index.js',
  ext: '.js',
  name: 'index'
}
*/
```

## 5. path.basename(path)

返回路径中的最后一部分（即文件名）

```javascript
console.log(path.basename('D:\\test\\index.js'));
// 返回: 'index.js'
```

## 6. path.dirname(path)

返回路径中的目录部分：

```javascript
console.log(path.dirname('D:\\test\\index.js'));
// 返回: 'D:\\test'
```

## 7. path.extname(path)

返回文件扩展名（包括点号）：

```javascript
console.log(path.extname('D:\\test\\index.js'));
// 返回: '.js'
```

## 8. path.normalize(path)

规范化路径，处理路径中的 ".." 和重复分隔符等，保留末尾分隔符：

```javascript
// POSIX:
console.log(path.normalize('/foo/bar//baz/asdf/quux/..'));
// 返回: '/foo/bar/baz/asdf'

// Windows:
console.log(path.normalize('C:\\temp\\\\foo\\bar\\..\\'));
// 返回: 'C:\\temp\\foo\\'

console.log(path.win32.normalize('C:////temp\\\\/\\/\\/foo/bar'));
// 返回: 'C:\\temp\\foo\\bar'
```

## 9. path.join(...paths)

拼接多个路径字符串，自动处理分隔符和相对关系：

```javascript
// POSIX:
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'));
// 返回: '/foo/bar/baz/asdf'

// Windows:
console.log(path.join('C:/foo/bar/baz/asdf', 'aaa', './index.js'));
// 返回: 'C:\\foo\\bar\\baz\\asdf\\aaa\\index.js'
```
