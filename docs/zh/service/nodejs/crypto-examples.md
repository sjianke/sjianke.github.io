# crypto(密码学)

## 1. 引入模块

```javascript
const crypto = require('node:crypto');
```

## 2. 对称加密 - 双方约定密钥

```javascript

const key = crypto.randomBytes(32); // 生成32字节(256位)随机密钥
const iv = crypto.randomBytes(16);  // 生成16字节初始向量

// 参数1 algorithm 接收一个算法 aes-128-cbc
// 参数2 key 密钥 32字节的密钥
// 参数3 iv 初始向量 支持16字节的向量
// 使用认证加密模式（推荐）
const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

// 添加认证标签（GCM模式必需）
cipher.update('hello world', 'utf8', 'hex');
const cipherText = cipher.final('hex');
const authTag = cipher.getAuthTag(); // 获取认证标签

console.log(`密文: ${cipherText} | 认证标签: ${authTag.toString('hex')}`);

// 解密
const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
decipher.setAuthTag(authTag); // 设置认证标签
decipher.update(cipherText, 'hex', 'utf8');
console.log(decipher.final('utf8'));

// 重要提示：
// 1. IV不需要保密，但必须唯一且不可预测
// 2. 实际应用中应将IV/认证标签与密文一起存储
```

## 3. 非对称加密 - 非对称加密使用一对密钥：公钥和私钥

公钥用于加密，私钥用于解密。公钥可以公开，私钥必须保密。

```javascript
// 非对称加密
// 非对称加密使用一对密钥：公钥和私钥
// 公钥用于加密，私钥用于解密。公钥可以公开，私钥必须保密。

// 生成密钥对（推荐3072位以上）
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 3072, // 2048为最低要求
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc', // 私钥加密保护
    passphrase: 'top-secret'
  }
});

// 加密（显式指定填充方案）
const encryptedData = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING // 更安全的填充
  },
  Buffer.from('hello world')
);

console.log('加密数据:', encryptedData.toString('hex'));

// 解密
const decryptedData = crypto.privateDecrypt(
  {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    passphrase: 'top-secret' // 提供私钥密码
  },
  encryptedData
);

console.log('解密数据:', decryptedData.toString());
// 注意：在实际应用中，公钥和私钥应该安全存储，并且不应该硬编码在代码中。
// 这里的公钥和私钥应该是双方协商好的，不能随意更改
// 生成密钥对时，可以指定公钥和私钥的编码格式和输出格式
```

## 4. 哈希算法 - 不可逆

哈希算法是一种单向加密算法，用于生成数据的唯一标识符（哈希值）。常用的哈希算法有 SHA-256、MD5 等。

注意：哈希算法是不可逆的，不能从哈希值还原原始数据。

```javascript
// 创建SHA-256哈希（推荐用于安全场景）
const hash = crypto.createHash('sha256');
hash.update('hello world');
console.log('SHA256:', hash.digest('hex'));

// 密码存储安全方案（推荐）
const password = 'userPassword123';
const salt = crypto.randomBytes(16); // 生成随机盐值
const iterations = 100000; // PBKDF2迭代次数

const key = crypto.pbkdf2Sync(
  password,
  salt,
  iterations,
  64,
  'sha512'
);
console.log('安全哈希:', key.toString('hex'));

// 警告：MD5已不安全（仅用于演示）撞库攻击
const weakHash = crypto.createHash('md5');
weakHash.update('hello world');
console.log('MD5(不推荐):', weakHash.digest('hex'));
```
