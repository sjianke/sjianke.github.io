# File System（文件系统）

[File system | Node.js v24.0.1 Documentation](https://nodejs.org/api/fs.html)

## writeFile（异步写入）

writeFile(file, data[, options], callback)

参数说明

- file 文件名
- data 待写入数据
- options 选项配置 [可选]
- callback 写入回调

::: code-group

```javascript [index.js]
// 1. 引入 fs 模块
const fs = require('node:fs');

// 2. 写入文件 - 无文件则创建后写入
fs.writeFile('./text.txt', 'Hello World', (err, res) => {
  // 写入失败后，返回错误对象
  if (err) {
    console.log('操作失败', err);
    return;
  }

  console.log('操作成功', res);
});
```

```txt [text.txt]
Hello World
```

:::

## writeFileSync（同步写入）

writeFile(file, data[, options])

参数说明

- file 文件名
- data 待写入数据
- options 选项配置 [可选]

::: code-group

```javascript [index.js]
// 1. 引入 fs 模块
const fs = require('node:fs');

// 2. 写入文件 - 无文件则创建后写入
fs.writeFile('./text.txt', 'Hello World');
```

```txt [text.txt]
Hello World
```

:::

## appendFile（追加文件内容）

appendFile(path, data[, options], callback)

参数说明

- path 文件路径
- data 待写入数据
- options 选项配置 [可选]
- callback 写入回调

::: code-group

```javascript [index.js]
// 1. 引入 fs 模块
const fs = require('node:fs');

// 2. 写入文件 - 无文件则创建后写入
fs.appendFile('./text.txt', '我是新添加的', (err, res) => {
  // 写入失败后，返回错误对象
  if (err) {
    console.log('操作失败', err);
    return;
  }

  console.log('操作成功', res);
});
```

```txt [text.txt]
Hello World我是新添加的
```

:::

## appendFileSync（同步追加文件内容）

appendFileSync(path, data[, options])

参数说明

- path 文件路径
- data 待写入数据
- options 选项配置 [可选]

::: code-group

```javascript [index.js]
// 1. 引入 fs 模块
const fs = require('node:fs');

// 2. 写入文件 - 无文件则创建后写入
fs.appendFileSync('./text.txt', 'Hello World');
```

```txt [text.txt]
Hello WorldHello World
```

:::

## createWriteStream（创建写入流）

createWriteStream(file[, options])

参数说明

- file 文件名
- options 选项配置 [可选]

::: code-group

```javascript [index.js]
// 1. 引入 fs 模块
const fs = require('node:fs');

// 创建写入流
const cws = fs.createWriteStream('./text.txt');

cws.write('半亩');
cws.write('半亩2');
cws.write('半亩3');

// 关闭写入
cws.close();
```

```txt [text.txt]
半亩半亩2半亩3
```

:::

## readFile（读取文件）

readFile(path[, options], callback)

参数说明

- path 文件路径
- options 选项配置 [可选]
- callback 回调

::: code-group

```javascript [index.js]
// 1. 引入 fs 模块
const fs = require('node:fs');

// 2. 写入文件 - 无文件则创建后写入
fs.readFile('./text.txt', (err, res) => {
  // 写入失败后，返回错误对象
  if (err) {
    console.log('读取失败', err);
    return;
  }

  console.log('读取成功', res.toString()); // Hello World
});
```

```txt [text.txt]
Hello World
```

:::

## readFileSync（同步读取文件）

readFileSync(path[, options])

参数说明

- path 文件路径
- options 选项配置 [可选]

::: code-group

```javascript [index.js]
// 1. 引入 fs 模块
const fs = require('node:fs');

// 2. 写入文件 - 无文件则创建后写入
const data = fs.readFileSync('./text.txt');

console.log('data', data.toString()); // Hello World
```

```txt [text.txt]
Hello World
```

:::

## createReadStream（流式读取文件）

createReadStream(file[, options])

参数说明

- file 文件
- options 选项配置 [可选]

::: code-group

```javascript [index.js]
// 1. 引入 fs 模块
const fs = require('node:fs');

// 2. 写入文件 - 无文件则创建后写入
const crs = fs.createReadStream('./text.txt');

// 监听数据读取事件
crs.on('data', (chunk) => {
  console.log(chunk);
});

// 监听结束事件
crs.on('end', () => {
  console.log('读取完成');
});

// <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 0d 0a>
// 读取完成
```

```txt [text.txt]
Hello World
```

:::

## 小案例 - 复制文件

- 使用 **readFile** 和 **writeFile**

::: code-group

```javascript [index.js]
const fs = require('node:fs');

// 读取 text.txt 文件内容
const readFile = fs.readFile('./text.txt');

// 写入到新文件
const writeFile = fs.writeFile('./newText.txt', readFile);
```

```txt [text.txt]
Hello World
```

```txt [newText.txt]
Hello World
```

:::

- 使用 **createWriteStream** 和 **createReadStream**

::: code-group

```javascript [index.js]
const fs = require('node:fs');

// 读取 text.txt 文件内容
const crs = fs.createReadStream('./text.txt');

// 写入到新文件
const cws = fs.createWriteStream('./newText.txt', readFile);

// crs.on('data', (chunk) => {
//   cws.write(chunk)
// })

// crs.on('end', () => {
//   cws.close()
//   console.log('读取结束')
// })

// 可简化为
crs.pipe(cws);
```

```txt [text.txt]
Hello World
```

```txt [newText.txt]
Hello World
```

:::

## rename（重命名/移动文件）

rename(oldPath, newPath, callback)

参数说明

- oldPath 旧文件路径
- newPath 新文件路径
- callback 回调

::: code-group

```javascript [index.js]
const fs = require('node:fs');

// 移动到 rename 文件夹下并修改名称
const data = fs.rename('./text.txt', '../rename/newText.txt', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('操作成功');
});
```

```txt [../rename/newText.txt]
Hello World
```

:::

## unlink（删除文件）

unlink(path, callback)

参数说明

- path 文件路径
- callback 回调

::: code-group

```javascript [index.js]
const fs = require('node:fs');

fs.unlink('./text.txt', (err) => {
  if (err) {
    console.log('error');
    return;
  }

  console.log('success');
});
```

:::

## rm（删除文件/文件夹）

rm(path[, options], callback)

参数说明

- path 文件路径
- options 配置【可选】
  - recursive 递归删除文件夹
- callback 回调

::: code-group

```javascript [index.js]
const fs = require('node:fs');

fs.rm('./text.txt', (err) => {
  if (err) {
    console.log('error');
    return;
  }

  console.log('success');
});
```

:::

## mkdir（创建文件夹）

mkdir(path[, options], callback)

参数说明

- path 文件路径
- options 配置【可选】
  - recursive 递归创建文件夹-多个子目录
- callback 回调

::: code-group

```javascript [index.js]
const fs = require('node:fs');

fs.mkdir('./temp', (err) => {
  if (err) {
    console.log('error');
    return;
  }

  console.log('success');
});
```

:::

## readdir（读取文件夹）

readdir(path, callback)

参数说明

- path 文件路径
- callback 回调

::: code-group

```javascript [index.js]
const fs = require('node:fs');

// 读取当前目录下的文件/文件夹
fs.readdir('./', (err, data) => {
  if (err) {
    console.log('error');
    return;
  }

  console.log(data); // ['index.js', 'text.txt']
});
```

```txt [text.txt]
Hello World
```

:::

## stat（文件状态）

stat(path, callback)

参数说明

- path 文件路径
- callback 回调

::: code-group

```javascript [index.js]
const fs = require('node:fs');

// 读取当前目录下的文件/文件夹
fs.stat('./text.txt', (err, data) => {
  if (err) {
    console.log('error');
    return;
  }

  // 是否为文件
  console.log(data.isFile()); // true

  // 是否为文件夹
  console.log(data.isDirectory()); // false

  console.log(data);
  /**
 {
    dev: 2531854346,
    mode: 33206,
    nlink: 1,
    uid: 0,
    gid: 0,
    rdev: 0,
    blksize: 4096,
    ino: 844424931588884,
    size: 17, // 文件大小
    blocks: 0,
    blocks: 0,
    blocks: 0,
    blocks: 0,
    blocks: 0,
    atimeMs: 1747148586940.9883,
    mtimeMs: 1747148574238.6582,
    ctimeMs: 1747148574238.6582,
    birthtimeMs: 1747112040864.618,
    atime: 2025-05-13T15:03:06.941Z, // 最后一次访问时间
    mtime: 2025-05-13T15:02:54.239Z, // 最后一次修改时间
    ctime: 2025-05-13T15:02:54.239Z, // 最后一次修改文件状态时间
    birthtime: 2025-05-13T04:54:00.865Z // 创建时间
  }
  */
});
```

```txt [text.txt]
Hello World
```

:::
