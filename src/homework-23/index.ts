import { on } from './on';
import { once } from './once';

const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

async function handleOnEvents(maxCount = Infinity) {
  const asyncIterable = on(eventEmitter, 'click');
  let count = 0;

  for await (const e of asyncIterable) {
    ++count;

    console.log('click', e); // Handle click!! 1 / Handle click!! 2 / 'Handle click!! 3';

    if (count === maxCount) {
      break;
    }
  }
}

async function handleOnceEvents() {
  const asyncIterable = once(eventEmitter, 'mouseleave');

  for await (const e of asyncIterable) {
    console.log('mouseleave', e); // Handle mouseleave!! 1
  }
}

handleOnEvents(3);
handleOnceEvents();

eventEmitter.emit('click', 'Handle click!! 1');
eventEmitter.emit('click', 'Handle click!! 2');
eventEmitter.emit('click', 'Handle click!! 3');
eventEmitter.emit('click', 'Handle click!! 4');

eventEmitter.emit('mouseleave', 'Handle mouseleave!! 1');
eventEmitter.emit('mouseleave', 'Handle mouseleave!! 2');

async function handleSeqEvents() {
  for await (const e of seq(
    once(eventEmitter, 'mousedown'),
    take(on(eventEmitter, 'mouseup'), 4)
  )) {
    console.log('Seq events', e); // down / 1 / 2 / 3 / 4
  }
}

handleSeqEvents();

eventEmitter.emit('mousedown', 'down');
eventEmitter.emit('mouseup', '1');
eventEmitter.emit('mouseup', '2');
eventEmitter.emit('mouseup', '3');
eventEmitter.emit('mouseup', '4');

eventEmitter.emit('mouseup', '5');
eventEmitter.emit('mouseup', '6');
