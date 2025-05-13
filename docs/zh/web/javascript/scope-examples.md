# 作用域/作用域链

在JavaScript的世界中，作用域（Scope）是代码执行时变量和函数的可访问性规则，而作用域链（Scope Chain）则是实现这一规则的核心机制。理解这两个概念对于编写可预测、可维护的代码至关重要。本文将通过具体实例解析JavaScript的作用域体系。



## 一、作用域

### 1.1 全局作用域（Global Scope）

```javascript
var globalVar = "全局变量";
function checkGlobal() {
  console.log(globalVar); // 可访问
}
```

- 任何地方均可访问
- 浏览器环境中属于window对象
- 过度使用易引发命名冲突



### 1.2 函数作用域（Function Scope）

```javascript
function myFunction() {
  var funcVar = "函数内部变量";
  console.log(funcVar); // 可访问
}
console.log(funcVar); // ReferenceError
```

- var声明的变量具有函数级作用域
- 存在变量提升现象

### 1.3 块级作用域（Block Scope，ES6+）

```javascript
if(true){
  let blockVar = "块级变量";
  const PI = 3.14;
}

// {
//   let blockVar = "块级变量";
//   const PI = 3.14;
// }
console.log(blockVar); // ReferenceError
```

- let/const声明具有块级作用域
- 有效避免循环中的闭包陷阱



## 二、作用域链的形成

### 2.1 词法作用域（Lexical Scope）

```javascript
function outer() {
  const outerVar = '外层';
  
  function inner() {
    const innerVar = '内层';
    console.log(outerVar); // 向上查找
  }
  
  inner();
}

outer();
```

- 作用域在代码书写阶段确定
- 形成嵌套的链式结构

### 2.2 执行上下文与变量查找

```javascript
const global = '地球';

function city() {
  const name = '上海';
  
  function district() {
    console.log(name);      // 上海
    console.log(global);    // 地球
    console.log(population); // ReferenceError
  }
  
  district();
}

city();
```

- 查找顺序：当前作用域 → 外层作用域 → 全局
- 查找失败时抛出 ReferenceError

## 三、闭包与作用域链的实战应用

### 3.1 经典闭包示例

```javascript
function createCounter() {
  let count = 0;
  return {
    increment: () => count++,
    getValue: () => count
  };
}

const counter = createCounter();
counter.increment();
console.log(counter.getValue()); // 1
```

- 内层函数维持对外部作用域的引用
- 突破函数作用域的生命周期限制

### 3.2 模块模式中的应用

```javascript
const calculator = (() => {
  let memory = 0;
  
  return {
    add: (x) => memory += x,
    clear: () => memory = 0
  };
})();

calculator.add(5);
console.log(calculator.memory); // undefined（私有化成功）
```

## 四、常见误区与最佳实践

### 4.1 变量提升陷阱

```javascript
console.log(hoistedVar); // undefined
var hoistedVar = 'value';

// let/const 会进入暂时性死区
console.log(tempVar); // ReferenceError
let tempVar = 'test';
```

### 4.2 循环中的闭包问题

```javascript
// 错误实现
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 输出3次3
}

// 正确方案
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100); // 0,1,2
}
```

### 4.3 性能优化建议

- 避免过深的嵌套层级
- 减少全局变量查找次数
- 合理使用const声明常量