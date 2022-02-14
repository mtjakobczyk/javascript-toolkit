import { readFile } from 'fs/promises'
// The fs/promises API provides asynchronous file system methods that return promises

console.log("Begin Main Function");

// Schedule an asynchronous file reading and waiting with the subsequent function execution until file is read to memory
async function runReadFile (filePath) {
  const readFilePromise = readFile(filePath)
  let contents = await readFilePromise
  console.log("Step 1")
  let contentsLength = contents.length
  console.log("Step 2: "+contentsLength) 
  let doubledContentsLength = contentsLength*2
  console.log("Step 3: "+doubledContentsLength)
}

runReadFile('../data/data1.csv').catch( (err) => { throw err } )

console.log("End Main Function");

// ### Output:
// Begin Main Function
// End Main Function
// Step 1
// Step 2: 50
// Step 3: 100