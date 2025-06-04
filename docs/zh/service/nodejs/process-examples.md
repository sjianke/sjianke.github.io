# process （进程）

| 功能                                     | 方法                        |
| ---------------------------------------- | --------------------------- |
| 获取系统 CPU 架构                        | `process.platform`          |
| 获取进程参数                             | `process.argv`              |
| 获取进程参数 `process.argv[0]`的只读副本 | `process.argv0`             |
| 获取当前进程 id                          | `process.pid`               |
| 获取工作目录                             | `process.cwd()`             |
| 获取内存信息                             | `process.memoryUsage()`     |
| 退出进程                                 | `process.exit()`            |
| 杀死进程                                 | `process.kill(process.pid)` |
| 获取系统中所有的环境变量                 | `process.env`               |
| 当前执行版本                             | `process.version`           |

## 示例

```javascript
const path = require('node:path');

// 获取 os CPU 架构
console.log(process.platform);

// argv 获取进程参数 argv []
console.log(process.argv);
console.log(process.argv.includes('-v') ? '1.0.0' : '无');

// pid 获取当前进程 id
console.log(process.pid);

// cwd 获取工作目录 - esm 模式中 无法使用 __dirname 可以使用 process.cwd() 或者 path.resolve()
console.log(process.cwd());
console.log(path.resolve());
console.log(__dirname);

// memoryUsage 获取内存信息
console.log(process.memoryUsage());

// console.log(process.argv0)

// exit 退出进程 后续代码将不会执行 可以通过方法监听
// console.log(process.exit())
// process.on('exit', function () {
//   console.log('exit')
// })

// console.log(process.kill(process.pid))

console.log(process.env);

// 当前执行版本
console.log(process.version);
```
