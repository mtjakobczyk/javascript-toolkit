import { readFile } from 'fs'
import { promisify } from 'util'

let path = '../data/data1.csv'

console.log("Begin Main Function");

// Schedule an asynchronous file reading
const readFilePromisified = promisify(readFile)
const readFilePromise = readFilePromisified(path)

// Register callbacks for a promise
readFilePromise.then((contents) => {
  console.log("Displaying the file contents:");
  console.log(contents.toString());
})
readFilePromise.catch((err) => {
  throw err;
})

console.log("End Main Function");

// ### Output:
// Begin Main Function
// End Main Function
// Displaying the file contents:
// ID;Name;Value
// 1;Rock;45
// 2;Kopernik;12
// 3;Vistula;31