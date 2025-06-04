# require 模块实现

```javascript
const fs = require('fs')
const path = require('path')

// 模块缓存（使用模块绝对路径作为键）
const cache = {}

/**
 * 自定义 CommonJS 风格的 require 函数
 * @param {string} modulePath 模块路径（如 './module'）
 * @returns {object} 模块的导出对象
 */
function customRequire(modulePath) {
  // 1. 解析模块的绝对路径
  const moduleId = path.resolve(modulePath)

  // 2. 检查缓存是否存在
  if (cache[moduleId]) {
    return cache[moduleId].exports
  }

  // 3. 初始化模块对象
  const module = { exports: {} }
  const exports = module.exports

  // 4. 读取模块文件内容
  const __filename = moduleId
  const __dirname = path.dirname(__filename)

  let content
  try {
    content = fs.readFileSync(__filename, 'utf8')
  } catch (error) {
    throw new Error(`Cannot find module '${modulePath}'`)
  }

  // 5. 使用 new Function 封装模块作用域
  try {
    const fn = new Function(
      'exports',
      'require',
      'module',
      '__filename',
      '__dirname',
      content
      // content + '\n//# sourceURL=' + __filename // 可选：在调试时显示源文件路径
    )

    // 6. 执行模块代码
    fn.call(
      exports, // this 指向 exports 对象
      exports, // 参数1: exports
      customRequire, // 参数2: require（指向自己）
      module, // 参数3: module
      __filename, // 参数4: __filename
      __dirname // 参数5: __dirname
    )
  } catch (error) {
    throw new Error(`Error loading module '${modulePath}': ${error.message}`)
  }

  // 7. 缓存模块
  cache[moduleId] = module.exports

  // 8. 返回导出对象
  return module.exports
}

const test = customRequire('./test.js');
```

