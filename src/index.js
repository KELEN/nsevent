
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
        for (let event of events) {
            event.fn.apply(event.fn, args);
        }
        if (onceEvent[eventName]) {
            onceEvent[eventName].fn.apply(event, args);
            delete onceEvent[eventName];
        }
    },
    /**
     * off event by fn or by name
     */
    off(eventName, ...args) {
        switch (args.length) {
            case 1: {
                if (typeof args[0] === 'function') {
                    events = events.filter(e => (e.fn !== args[0] || e.name !== eventName));
                } else {
                    // filter same namespace event
                    events = events.filter(e => (`${e.name}-${e.ns}` !== `${eventName}-${args[0]}`))
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