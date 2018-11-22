const NSEvent = require('../dist/nsevent.cjs');

NSEvent.on('change', (a, b, c) => {
  console.log('ns change');
}, 'ns');

NSEvent.on('change', (a, b, c) => {
  console.log('ns2 change');
}, 'ns2');

NSEvent.on('change', () => {
  console.log('change');
});

NSEvent.on('fire', () => {
  console.log('fire');
});

NSEvent.on('fire', () => {
  console.log('fire1');
});

NSEvent.emit('change', { ns: ['ns'] });
NSEvent.emit('change');
NSEvent.off('change', 'ns');

console.log('==========');

NSEvent.emit('change', { ns: ['ns', 'ns2'] });
NSEvent.emit('change');
NSEvent.emit('fire');
NSEvent.emit('fire');
NSEvent.emit('fire');