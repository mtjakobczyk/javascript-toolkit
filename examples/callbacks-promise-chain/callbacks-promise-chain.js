import { readFile } from 'fs'
import { promisify } from 'util'

let path = '../data/data1.csv'

console.log("Begin Main Function");

// Schedule an asynchronous file reading
const readFilePromisified = promisify(readFile)
const readFilePromise = readFilePromisified(path)

// Register callbacks for a promise
readFilePromise
  .then((contents) => { console.log("Callback 1"); return contents.length })
  .then((contentsLength) => { console.log("Callback 2: "+contentsLength); return contentsLength*2 })
  .then((doubledContentsLength) => { console.log("Callback 3: "+doubledContentsLength) })

readFilePromise.catch((err) => {
  throw err;
})

console.log("End Main Function");

// ### Output:
// Begin Main Function
// End Main Function
// Callback 1
// Callback 2: 50
// Callback 3: 100