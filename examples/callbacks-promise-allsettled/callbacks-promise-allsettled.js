import { readFile } from 'fs/promises'
// The fs/promises API provides asynchronous file system methods that return promises

// Define a function
async function runReadFilesFromArray (pathsArray) {
  const readFilePromisesArray = filepaths.map((file) => readFile(file))
  const promiseSettledResult = await Promise.allSettled(readFilePromisesArray)
  
  promiseSettledResult
    .filter(({status}) => status === 'rejected')
    .forEach(({reason}) => console.error(reason.message))
  
  const fileContentsArray = promiseSettledResult
    .filter(({status}) => status === 'fulfilled')
    .map(({value}) => Buffer.concat( [ value, Buffer.from('\n') ] ) )
  
  return fileContentsArray
}

console.log("### Begin Main Function");

const filepaths = [ '../data/data1.csv', '../data/dataNOTEXIST.csv', '../data/data2.csv' ]
// Invoke the function providing a callback to the promise
runReadFilesFromArray(filepaths).then( (bufferArray) => {
  console.log("### Data Contents") 
  console.log(Buffer.concat(bufferArray).toString()) 
} )

console.log("### End Main Function");

// ######### Output:
// ### Begin Main Function
// ### End Main Function
// ENOENT: no such file or directory, open '../data/dataNOTEXIST.csv'
// ### Data Contents
// 1;Rock;45
// 2;Kopernik;12
// 3;Vistula;31
// 8;Rap;11
// 9;Chopin;5