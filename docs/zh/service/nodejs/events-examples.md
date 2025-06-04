# events（事件触发器）

## 1. 引入模块

```javascript
const EventEmitter = require('node:events')
```



## 2. 示例

```javascript
const EventEmitter = require('node:events');

// 发布订阅模式 off on emit once 
const eventEmitter = new EventEmitter()

const effect = function (params) {
    console.log('click', params)
}

// 订阅 - 默认只能订阅 10 个， 可通过 emitter.setMaxListeners(20) 设置
emitter.on('click', effect)

// 发布 - 触发订阅者 
emitter.emit('click', '点击了') 
// click effect

// 取消订阅
emitter.off('click', effect)
// 不再触发订阅，已经不存在订阅
emitter.emit('click', '点击了')

// 触发一次
emitter.once('change', (params) => {
  console.log('change', params)
})

emitter.emit('change', '触发一次') // change 触发一次
// 不再触发
emitter.emit('change', '触发一次')

```

