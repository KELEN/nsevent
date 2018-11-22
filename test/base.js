const NSEvent = require('../dist/nsevent.cjs');

NSEvent.on('add', (a, b, c) => {
  console.log(a, b, c);
});

NSEvent.on('sub', (a, b) => {
  console.log(a, b);
});

NSEvent.on('sub', (a, b) => {
  console.log(a, b, 'ns');
}, 'ns');

NSEvent.once('once', () => {
  console.log('once');
})

NSEvent.emit('add', 1, 2, 3);
NSEvent.emit('sub', 20, 10);
NSEvent.emit('sub', 20, 10, { ns: ['ns'] });

NSEvent.emit('once');
NSEvent.emit('once');
NSEvent.emit('once');

NSEvent.once('add', (a, b) => {
  console.log(a, b);
});

NSEvent.emit('add', 1, 2);      // 1, 2
NSEvent.emit('add', 1, 2);      // nothing