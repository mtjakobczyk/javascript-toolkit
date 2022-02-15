class NotFiftyError extends Error {
  constructor (errorName = '') {
      super(errorName + ' cannot be 50')
      this.code = 'ERR_CANNOT_BE_FIFTY'
  }
  get name () {
      return 'NotFiftyError [' + this.code + ']'
  }
}

function calculateSomething (inputOne) {
  if (typeof inputOne !== 'number') throw new TypeError('the input argument must be a number')
  if (inputOne < 0 || inputOne > 100) throw new RangeError('the input argument must be between 0 and 100')
  if (inputOne == 50) throw new NotFiftyError('the input argument')
  return inputOne+1
}

calculateSomething(50)

// ### Output:
// NotFiftyError [ERR_CANNOT_BE_FIFTY]: the input argument cannot be 50
// ...
// code: 'ERR_CANNOT_BE_FIFTY'
