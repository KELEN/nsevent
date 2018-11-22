var events = [];
var onceEvent = {};

var NSEvent = {
  /**
   * add event
   */
  on: function on(eventName, fn, ns) {
    events.push({
      name: eventName,
      fn: fn,
      ns: ns
    });
  },

  /**
   * once event
   */
  once: function once(eventName, fn, ns) {
    onceEvent[eventName] = {
      ns: ns,
      fn: fn
    };
  },

  /**
   * emit event
   */
  emit: function emit(eventName) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var last = args[args.length - 1];
    if (last && last.ns && Array.isArray(last.ns)) {
      // 指定命名空间触发
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var event = _step.value;

          if (event.name === eventName && last.ns.indexOf(event.ns) > -1) {
            event.fn.apply(event.fn, args.slice(0, args.length - 1));
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else {
      // 根据事件名触发
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = events[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _event = _step2.value;

          if (_event.name === eventName) {
            _event.fn.apply(_event.fn, args);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
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
  off: function off(eventName) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    switch (args.length) {
      case 1:
        {
          var _ret = function () {
            var arg = args[0];
            if (Array.isArray(arg)) {
              var _loop = function _loop(idx) {
                if (typeof arg[idx] === 'function') {
                  events = events.filter(function (e) {
                    return e.fn !== arg[idx] || e.name !== eventName;
                  });
                } else {
                  // filter same namespace event
                  events = events.filter(function (e) {
                    return e.name + '-' + e.ns !== eventName + '-' + arg[idx];
                  });
                }
              };

              // 遍历数组解绑事件
              for (var idx in arg) {
                _loop(idx);
              }
            } else if (typeof arg === 'function') {
              events = events.filter(function (e) {
                return e.fn !== arg || e.name !== eventName;
              });
            } else {
              // filter same namespace event
              events = events.filter(function (e) {
                return e.name + '-' + e.ns !== eventName + '-' + arg;
              });
            }
            return 'break';
          }();

          break;
        }
      case 2:
        {
          // filter same namespace with function
          events = events.filter(function (e) {
            return e.fn !== args[0] || e.name + '-' + e.ns !== eventName + '-' + args[1];
          });
          break;
        }
      default:
        {
          events = events.filter(function (e) {
            return e.name !== eventName;
          });
        }
    }
  }
};

export default NSEvent;
