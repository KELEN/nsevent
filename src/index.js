
let events = [];
let onceEvent = {};

const NSEvent = {
  /**
   * add event
   */
  on(eventName, fn, ns) {
    events.push({
      name: eventName,
      fn: fn,
      ns: ns
    })
  },
  /**
   * once event
   */
  once(eventName, fn, ns) {
    onceEvent[eventName] = {
      ns: ns,
      fn: fn
    };
  },
  /**
   * emit event
   */
  emit(eventName, ...args) {
    let last = args[args.length - 1];
    if (last && last.ns && Array.isArray(last.ns)) {
      // 指定命名空间触发
      for (let event of events) {
        if (event.name === eventName && last.ns.indexOf(event.ns) > -1) {
          event.fn.apply(event.fn, args.slice(0, args.length - 1));
        }
      }
    } else {
      // 根据事件名触发
      for (let event of events) {
        if (event.name === eventName) {
          event.fn.apply(event.fn, args);
        }
      }
    }

    if (onceEvent[eventName]) {
      onceEvent[eventName].fn.apply(null, args);
      delete onceEvent[eventName];
    }
  },
  /**
   * off event by fn or by name
   */
  off(eventName, ...args) {
    switch (args.length) {
      case 1: {
        let arg = args[0];
        if (Array.isArray(arg)) {
          // 遍历数组解绑事件
          for (let idx in arg) {
            if (typeof arg[idx] === 'function') {
              events = events.filter(e => (e.fn !== arg[idx] || e.name !== eventName));
            } else {
              // filter same namespace event
              events = events.filter(e => (`${e.name}-${e.ns}` !== `${eventName}-${arg[idx]}`))
            }
          }
        } else if (typeof arg === 'function') {
          events = events.filter(e => (e.fn !== arg || e.name !== eventName));
        } else {
          // filter same namespace event
          events = events.filter(e => (`${e.name}-${e.ns}` !== `${eventName}-${arg}`))
        }
        break;
      }
      case 2: {
        // filter same namespace with function
        events = events.filter(e => (e.fn !== args[0] || (`${e.name}-${e.ns}` !== `${eventName}-${args[1]}`)));
        break;
      }
      default: {
        events = events.filter(e => (e.name !== eventName));
      }
    }
  }
}

export default NSEvent;