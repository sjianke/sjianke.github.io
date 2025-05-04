# 闭包（Closure）：从入门到深入理解

闭包（Closure）是函数式编程中的核心概念，当一个内部函数捕获并携带其外部函数作用域中的变量时，就形成了闭包。这种机制打破了传统作用域的生命周期限制，使得外部函数的变量在函数执行结束后依然存活。

## 1. 闭包的定义


闭包是函数与其定义时的词法环境（作用域链）的绑定，即使函数在其原始作用域外执行，仍能访问该环境中的变量


换句话说，闭包是由函数及其声明时的词法环境（作用域链）组合而成的结构，使得函数可以持续访问其定义时的作用域中的变量。

## 2. 词法作用域

为了理解闭包，首先需要了解什么是 **词法作用域（Lexical Scope）**。**“词法作用域”** 是指在 JavaScript 中，函数的作用域是根据函数定义的位置来决定的，而不是执行的位置。换句话说，函数定义时的上下文（它所处的环境）决定了它能访问哪些变量。

- **定义时的作用域**：函数的作用域由它被声明的位置决定，而非调用位置
- **环境记录**：每个函数在创建时都会保存其所在作用域的变量环境
- **链式访问**：通过作用域链（Scope Chain）逐级向上查找变量

例如：

```javascript
function outer() {
  const outerVar = 'outer'; // outerVar 在外部函数作用域中
  function inner() {
    console.log(outerVar); // inner 函数能够访问 outerVar
  }
  return inner; // 返回内层函数 inner，形成闭包
}

const closureFn = outer(); // outer 执行后返回 inner 函数
closureFn(); // 调用 closureFn，输出 'outer'，因为它依然记住 outerVar
```

在这个例子中，inner 函数形成了一个闭包，能够访问 outer 函数中的变量 y，即使 outer 函数已经执行完毕。闭包使得 inner 函数能够“记住” outer 函数的作用域。

## 3. 闭包形成的三个关键要素

1. **函数内部定义函数**：你需要在一个函数内部定义另一个函数。
2. **外部函数返回内层函数**：外部函数返回内层函数或将内层函数传递到外部。
3. **内层函数访问外部函数的变量**：内层函数引用了外部函数的局部变量或参数。

例如：

```javascript
function outer() {
  let outerVar = 'I am from outer';
  function inner() {
    console.log(outerVar);
  }
  return inner; // 返回内层函数
}

const closure = outer(); // 执行外部函数，返回内层函数
closure(); // 输出 'I am from outer'，内层函数可以访问外部函数的变量
```

## 4. 闭包的作用

闭包的作用非常广泛，以下是几个典型的应用场景：

### 4.1 数据封装和私有变量

闭包可以用来封装数据，并隐藏不需要暴露给外部的实现细节。通过闭包，外部可以通过特定的接口访问或修改这些私有变量。

```javascript
function createCounter() {
  let privateCount = 0; // privateCount 是一个私有变量
  function changeBy(val) {
      privateCount += val
  }
    
  return {
    increment () {
		changeBy(1)
    },
    decrement () {
		changeBy(-1)
    },
    getValue () {
      return privateCount;
    },
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
console.log(counter.getValue()); // 2
```

在这个例子中，`privateCount` 是一个私有变量，它只能通过 `increment` 和 `decrement` 方法来修改，而外部无法直接访问它。

### 4.2 回调函数和异步编程

在异步编程中，闭包可以帮助我们保持对外部变量的访问。例如，`setTimeout` 函数使用闭包来确保在延时操作完成后，依然能访问到外部的数据。

```javascript
function fetchData(callback) {
  const data = 'some data from API';
  setTimeout(() => {
    callback(data); // 这里的回调函数会形成闭包
  }, 1000);
}

fetchData(function (response) {
  console.log(response); // 输出 'some data from API'
});
```

在这个例子中，回调函数通过闭包访问了外部函数 `fetchData` 的变量 `data`，即使 `fetchData` 函数执行完毕，回调函数仍然可以访问到它。

### 4.3 闭包与循环

闭包和循环结合时常常出现一些困惑，尤其是在使用 `var` 声明变量时。闭包会共享同一个作用域中的变量，这可能导致一些非预期的结果。考虑以下例子：

```javascript
function createFunctions() {
  const functions = [];
  for (var i = 0; i < 3; i++) {
    functions.push(function () {
      console.log(i); // 这里的 i 会是 3，因为闭包共享了同一个 i 变量
    });
  }
  return functions;
}

const funcs = createFunctions();
funcs[0](); // 输出 3
funcs[1](); // 输出 3
funcs[2](); // 输出 3
```

这是因为 `var` 是函数作用域，而不是块作用域，所以所有的闭包都共享了同一个 `i` 变量。为了避免这种情况，可以使用 `let` 关键字，它具有块级作用域：

```javascript
function createFunctions() {
  const functions = [];
  for (let i = 0; i < 3; i++) {
    functions.push(function () {
      console.log(i); // 这里的 i 会是循环中对应的值
    });
  }
  return functions;
}

const funcs = createFunctions();
funcs[0](); // 输出 0
funcs[1](); // 输出 1
funcs[2](); // 输出 2
```

### 4.4 模块化开发

闭包是实现模块化的基础（如 IIFE 模式）：

```javascript
const calculator = (function() {
  let memory = 0; // 🛡️ 私有变量
  return {
    add(x) { memory += x },
    getMemory() { return memory }
  };
})();

calculator.add(5);
console.log(calculator.getMemory()); // 5
```

## 5. 闭包的性能和内存管理

闭包是非常强大的，但它也可能带来一些性能上的问题，特别是当闭包引用了大量的外部资源时。闭包保持对外部变量的引用，这可能会阻止这些变量被垃圾回收，导致内存泄漏。

为了避免这种情况，应该谨慎使用闭包，确保不创建不必要的闭包引用。尤其是当使用异步操作时，要注意清理不再需要的闭包，避免内存泄漏。

### 5.1 闭包性能优化表

| 场景         | 优化方案           | 效果             |
| :----------- | :----------------- | :--------------- |
| 循环创建闭包 | 使用 IIFE 隔离变量 | 避免共享变量污染 |
| 高频触发闭包 | 节流/防抖处理      | 减少执行次数     |
| 大型数据闭包 | 手动解除引用       | 及时释放内存     |

### 5.2 闭包生命周期

```
闭包生命周期：
外部函数执行 → 创建变量 → 返回内部函数 → 外部函数上下文销毁  
                   ↑               ↓  
            闭包持有变量引用 → 变量持续存活
```



## 6. 常见问题解析

### 6.1 循环中的闭包问题

以下代码会输出 `输出 5 次 5`（循环执行 5 次），而非预期的 `0, 1, 2, 3, 4`：

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 100);
}
```

**原因**：所有回调共享同一个 `i`，循环结束时 `i` 已变为 5。
**解决方案**：使用 `let`（块级作用域）或 IIFE 创建独立作用域：

```javascript
// 使用 let
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
}

// 使用 IIFE
for (var i = 0; i < 5; i++) {
  (function (j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}
```

### 6.2 内存泄漏

闭包可能导致外部函数的变量无法被垃圾回收：

```javascript
function heavyProcess() {
  const largeData = new Array(1000000).fill('*');
  return function () {
    console.log('保留了对 largeData 的引用');
  };
}

const leak = heavyProcess();
// 即使不再需要 largeData，它仍被闭包保留在内存中
```

**解决方法**：在不再需要时手动解除引用：

```javascript
leak = null; // 释放内存
```

### 6.3 全局变量闭包辨析

函数访问了一个全局作用域的变量，这种属于非典型闭包的表现通常是：我们并没有直接看到闭包的定义（例如函数内嵌函数），但仍然存在某种方式让内部函数可以访问外部作用域的变量。

**技术规范**：是闭包（函数访问外层词法环境变量）  
**实际意义**：不属于典型闭包应用（全局变量本身独立存在）

**技术本质**：✅ 是闭包（函数访问外层词法环境变量）  
**实际意义**：❌ 不属于典型闭包应用（全局变量本身独立于闭包存在）  

```javascript


// 示例说明
let global = 1;
function readGlobal() {
  console.log(global); // 闭包机制存在，但无实际控制意义
}
```
