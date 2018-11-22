const NSEvent = require('../dist/nsevent.cjs');

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