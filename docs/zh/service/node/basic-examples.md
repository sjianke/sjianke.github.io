# node

## Buffer

Buffer 中文译为【缓冲区】，是一个类似于数组的**对象**，用于表示固定长度的字节序列，换句话说就是 Buffer 就是一个固定长度的内存空间，专门用于处理**二进制数据**

### 一、**Buffer 的核心特性**

1. **内存结构与用途**
   Buffer 是 Node.js 中处理二进制数据的核心对象，其底层是一段 ​**​ 固定长度的连续内存空间 ​**​，通过 V8 引擎的堆外内存直接管理，无需经过 JavaScript 的垃圾回收机制
   - **与数组的区别**：Buffer 的每个元素为 1 字节（0-255），而 JavaScript 数组元素可以是任意类型且内存动态分配。
2. **性能优势**
   直接操作二进制数据（如文件读写、网络通信）时，Buffer 相比字符串操作效率更高，避免了编码转换的开销。

### Buffer.alloc(size)

- **内存初始化机制** - 就是把数据全部改为 0

  分配的每字节内存都会被强制填充为`0x00`（十六进制 0），确保无遗留数据。

```javascript
const buf = Buffer.alloc(10);

// <Buffer 00 00 00 00 00 00 00 00 00 0>
```

- **适用场景**

  安全性要求高的场景（如密钥存储、敏感数据处理），避免内存泄漏风险。

### Buffer.allocUnsafe(size)

- **内存复用原理**
  从 Node.js 预分配的 ​**​ 内存池 ​**​ 中快速获取内存块，不进行初始化，可能包含其他应用释放的残留数据。例如：

```javascript
const buf = Buffer.allocUnsafe(100);

// <Buffer 70 fd 4f e7 7e 02 00 00 a0 be 4b e7 7e 02 00 00 39 ... 9950 more bytes>

// 两次结果输出不同
// <Buffer f0 aa ce f8 72 02 00 00 d0 6a ce f8 72 02 00 00 00 ... 9950 more bytes>
```

- **性能与风险权衡**
  - 优势：比 **alloc** 快约 30%（省去清零操作），适合高频临时缓冲区的场景（如实时音视频流处理）。
  - 风险：需手动覆盖旧数据，否则可能导致信息泄露（如旧会话密钥残留）。

### Buffer.from()

以 UTF-8 编码存储字节，显示为十六进制是控制台默认输出格式

```javascript
const buf3 = Buffer.from('hello');

console.log(buf3); // <Buffer 68 65 6c 6c 6f>

const buf4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]);
console.log(buf4); // <Buffer 69 6c 6f 76 65 79 6f 75>
console.log(buf4.toString()); // iloveyou 默认采用utf-8转换
```
