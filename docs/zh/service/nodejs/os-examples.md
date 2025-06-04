# OS （操作系统）

## 1. 引入模块

```javascript
const os = require('node:os');
```

| 功能               | 方法                              |
| ------------------ | --------------------------------- |
| 获取操作系统平台   | `os.platform()`                   |
| 获取操作系统版本号 | `os.release()`                    |
| 操作系统名称       | `os.type()`                       |
| 获取系统版本       | `os.version()`                    |
| 读取用户目录       | `os.homedir()`                    |
| 读取主机名称       | `os.hostname()`                   |
| 操作系统 CPU 架构  | `os.arch()`                       |
| 内存信息           | `os.freemem()` 或 `os.totalmem()` |
| CPU 内核的信息     | `os.cpus()`                       |
| 网络信息           | `os.networkInterfaces()`          |

```javascript
const os = require('node:os');

console.log(os.platform()); // win32
```
