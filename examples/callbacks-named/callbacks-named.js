import { readFile } from 'fs'

let path = '../data/data1.csv'

console.log("Begin Main Function");

// Define function to be used as callback
const readFileCallback = function (err, data) {
  if (err) throw err;
  console.log("Displaying the file contents:");
  console.log(data.toString());
}

// Schedule an asynchronous file reading (registering a named function for callback)
readFile(path, readFileCallback);

console.log("End Main Function");

// ### Output:
// Begin Main Function
// End Main Function
// Displaying the file contents:
// ID;Name;Value
// 1;Rock;45
// 2;Kopernik;12
// 3;Vistula;31