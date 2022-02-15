import { EventEmitter } from 'events'

const handleTresholdExceeded = function (value) {
  console.log('named function event handler: Treshold Exceeded '+value)
}

// Create Event Emitter and register callbacks for the event handlers
const ee = new EventEmitter()
ee.on('tresholdExceeded', handleTresholdExceeded)
ee.on('tresholdExceeded', (value) => { console.log('fat arrow event handler: Treshold Exceeded '+value) })

ee.emit('tresholdExceeded', 15)

// ### Output:
// named function event handler: Treshold Exceeded 15
// fat arrow event handler: Treshold Exceeded 15