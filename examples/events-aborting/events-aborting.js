import { once, EventEmitter } from 'events'
import { setTimeout } from 'timers/promises'

const ee = new EventEmitter()

const ac = new AbortController()
let signal = ac.signal
setTimeout(500).then(() => ac.abort())

try {
  await once(ee, 'someEvent', { signal })
  console.log('emitted someEvent unblocked logging this output')
} catch (err) {
  if (err.code !== 'ABORT_ERR') throw err
  console.log('timeout - someEvent has not been emitted until this time')
}

// ### Output:
// timeout - someEvent has not been emitted until this time