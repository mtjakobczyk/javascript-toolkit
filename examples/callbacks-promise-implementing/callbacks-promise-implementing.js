
function promisifiedDoSomething (inputOne) {
  return new Promise((resolve, reject) => {
    if (typeof inputOne !== 'number') {
      reject(new TypeError('the input argument must be a number'))
      return
    }
    if (inputOne < 0 || inputOne > 100) {
      reject(new RangeError('the input argument must be between 0 and 100'))
      return
    }
    // Here could be some lengthy operation
    // Returning a result
    resolve(inputOne+1)
  })
}

let myPromise = promisifiedDoSomething(-5)
myPromise.then((value) => { console.log(value) } ).catch((err)=> { console.error('Error: '+err.message) })