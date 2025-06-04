# Children Process （子进程）

## 1. 引入模块

```javascript
const process = require('node:child_process');
```

## 2. 创建子进程命令

| 说明                  | 异步方法             | 同步方法                 |
| --------------------- | -------------------- | ------------------------ |
| 执行命令-无限制       | `process.spawn()`    | `process.spawnSync`()    |
| 执行命令-字节数有限制 | `process.exec()`     | `process.execSync()`     |
| 执行可执行文件        | `process.execFile()` | `process.execFileSync()` |
| 创建 node 子进程      | `process.fork()`     |                          |

## 3. 示例

- exec

  ```javascript
  const { exec } = require('node:child_process');

  // 异步
  exec('node -v', (err, stdout, stderr) => {
    if (err) {
      console.error(`执行命令失败: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`错误输出: ${stderr}`);
      return;
    }
    console.log(`命令输出: ${stdout}`); // 命令输出: v16.18.1
  });
  ```

- execSync

  ```javascript
  const { execSync } = require('node:child_process');

  // 获取 node 版本
  const nodeVersion = execSync('node -v');

  console.log('Node.js 版本:', nodeVersion.toString().trim());

  // 创建文件夹
  execSync('mkdir testDir');

  // 打开浏览器、软件等。
  execSync('start chrome http://www.baidu.com');
  execSync('D:\\Tencent\\QQMusic\\QQMusic.exe'); // 打开 QQ 音乐
  ```

- spawn

  ```javascript
  const { spawn } = require('node:child_process');
  const { stdout } = spawn('netstat', ['-a']);

  stdout.on('data', (data) => {
    console.log(data.toString());
  });

  stdout.on('close', (code) => {
    console.log(`子进程退出，退出码 ${code}`);
  });
  ```

- execFile 可执行文件
  ::: code-group

  ```javascript [index.js]
  const { execFile } = require('node:children_process');

  execFile(process.cwd() + '/bat.cmd', null, (err, stdout, stderr) => {
    console.log(err, stdout, stderr);
  });
  ```

  ```shell [bat.cmd]
  echo '开始执行';

  mkdir test

  cd test

  echo process.on("message",function(msg){console.log(msg)}) > test.js

  node test.js

  exit '退出';
  ```

  :::

- fork 只能执行 js 文件
  ::: code-group

  ```javascript [index.js]
  const { fork } = require('node:child_process');

  const child = fork('./child.js', ['arg1', 'arg2']);

  // 向子进程发送消息
  child.send({ message: 'Hello from parent' });

  child.on('message', (res) => {
    console.log('接受子进程发来的消息', res);
  });
  ```

  ```index.js [child.js]
  process.on('message', (res) => {
    console.log('接收主进程发来的消息', res)
  })

  process.send('发送给主进程消息')

  console.log('进程参数列表', process.argv)
  ```

  :::
