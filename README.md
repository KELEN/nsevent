# nsevent

> 有命名空间的事件监听器 - event emitter with namespace

## 安装和使用

```bash
npm i nsevent --save
```

```javascript
const nsevent = require('nsevent');
```

```html
// 浏览器
<script src="dist/nsevent.umd.js"></script>
```

## on(eventName, fn, namespace)

| 参数 | 必选 | 说明 |
| -- | -- | -- |
| eventName | 是 | 监听事件名 |
| fn | 是 | 回调函数 |
| namespace | 否 | 命名空间 |

```javascript
NSEvent.on('add', (a, b) => {
  console.log(a, b);
});

NSEvent.on('add', (a, b) => {
  console.log(a, b, 'ns');
}, 'ns');

// 1, 2
// 1, 2, 'ns'
NSEvent.emit('add', a, b);  
```

## once(eventName, fn)

| 参数 | 必选 | 说明 |
| -- | -- | -- |
| eventName | 是 | 监听事件名 |
| fn | 是 | 回调函数 |

```javascript
NSEvent.once('add', (a, b) => {
  console.log(a, b);
});

NSEvent.emit('add', 1, 2);      // 1, 2
NSEvent.emit('add', 1, 2);      // nothing
```

## emit(eventName, arg1, arg2, ..., object)

| 参数 | 必选 | 说明 |
| -- | -- | -- |
| eventName | 是 | 监听事件名 |
| arg[1,2,3...] | 否 | 传递给回调函数的值 |
| object | 否 | { 最后一个传递对象，ns: ['ns'] } 可以指定命名空间触发事件 |

```javascript
NSEvent.on('fire', () => {
  console.log('fire ns');
}, 'ns');

NSEvent.on('fire', () => {
  console.log('fire ns2');
}, 'ns');

NSEvent.on('fire', () => {
  console.log('fire');
});

NSEvent.emit('fire');     // fire ns, fire ns2, fire
console.log("======");
NSEvent.emit('fire', 1, 2, { ns: [] });     // nothing
NSEvent.emit('fire', 1, 2, { ns: ['ns'] }); // fire ns, fire ns2
```

## off(eventName, [string|function|array])

| 参数 | 必选 | 说明 |
| -- | -- | -- |
| eventName | 是 | 监听事件名 |
| string|function|array | 否 | 解绑回调函数 |
| | string | 指定命名空间解绑 |
| | function | 指定函数解绑 |
| | array | 通过数组指定命名空间或者函数解绑 |

```javascript
const NSEvent = require('../dist/nsevent.cjs');

NSEvent.on('fire', () => {
  console.log('fire ns');
}, 'ns');

NSEvent.on('fire', () => {
  console.log('fire ns');
}, 'ns');

NSEvent.on('fire', () => {
  console.log('fire1');
}, 'ns1');

NSEvent.emit('fire');   // fire ns, fire ns, fire1
console.log('==========');
NSEvent.off('fire', ['ns']);
NSEvent.emit('fire');   // fire1
console.log('==========');
NSEvent.off('fire', 'ns1');
NSEvent.emit('fire');   // none
```