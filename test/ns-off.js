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
