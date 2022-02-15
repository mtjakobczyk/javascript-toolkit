# Javascript recipes and reusable code
Loose notes on JavaScript ecosystem

## Javascript Ecosystem
[npm, Inc.](https://www.linkedin.com/company/npm-inc-) maintains npm, a JavaScript package manager, and provides hosting for software development and version control with the usage of Git. It is a subsidiary of GitHub (a subsidiary of Microsoft). Source: Wikipedia

The original host environment for JavaScript was a web browser. Since 2010, another host environment has been available for JavaScript code. Instead of constraining JavaScript to work with the APIs provided by a web browser, Node gives JavaScript access to the entire operating system, allowing JavaScript programs to read and write files, send and receive data over the network, and make and serve HTTP requests. Source: Wikipedia

### JavaScript
> JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.
>
> **Prototype-based programming** is a style of object-oriented programming in which classes are not explicitly defined, but rather derived by adding properties and methods to an instance of another class.
>
> In simple words: this type of style allows the creation of an object without first defining its class.
> 
> Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript

Constants are declared with `const` and variables are declared with `let`. 

JavaScript has two operators that test equality:
- strict equality (`===`) requires type and value equality
- flexible equality (`==`) requires only value equality (supporting automated conversions)

#### Primitive types
- Null: `null`
    - used to express the absence of the object
- Undefined: `undefined`
    - taken by any variable initializied without value
    - returned by a function without `return` statement
    - returned by an expression that attempts to access a non-existing property of an object
- Number: `3`, `1.7`, `-1e3`, `NaN`
- BigInt
- String: 'text', "text", \`text ${var}\`
    - immutable ordered sequence of 16-bit values, each represents a Unicode character
    - JavaScript uses the UTF-16 character set
    - the `+` is string concatenation operator
    - two strings are equal if they consist of exactly the same sequence of 16-bit values
        - to compare use `===` and `!==` operators
- Boolean: `true`, `false`
- Symbol: `Symbol('text')`, `Symbol.for('namespace')`

#### Functions
Functions are objects. This means a function can be returned by other function as well.
A function can be passed to another function as an argument:
```javascript
doSomething(function () { console.log('something') }, 15)
```
A function can be assigned to an object:
```javascript
const obj = { count: 10, fn: function () { console.log(this.count) } }
obj.fn() // prints 10
```
The call method sets the the function context:
```javascript
function outputText() { console.log(this.text) }
const t1 = { text: 10 }
const t2 = { text: 25 }
fn.outputText(t1) // prints 10
fn.outputText(t2) // prints 25
```
Lambda functions (aka fat arrow functions):
```javascript
const subtract = (a, b) => a - b
const square = (n) => {
  return Math.pow(n, 2)
}
```
The expression following the fat arrow (=>) is the return value of the function. Lambdas do not have the `this` value.

#### Objects
An object is an unordered set of key-value pairs. The keys are called properties. 
Values . 

Each **property** has the following property attributes:
- `name` - can be string or Symbol
- `value` - can be any primitive type or an object
- `writable` - specifies if the value of the property can be set
- `enumerable` - specifies if the property name is returned by a for/in loop.
- `configurable` - specifies if the property can be deleted and its attributes changed

Creating an object using the so called **object literal**:
```javascript
let car = { mark: 'Mazda', year: 2016 }
```

Creating an object using **class-syntax constructors** (available from ECMAScript 2015):
```javascript
let car = { mark: 'Mazda', year: 2016 }
```
Class-syntax constructors effectively use functions in the background to implement the prototypal inheritance.

#### Inheritance
Inheritance in JavaScript is achieved with a chain of **prototypes**.

> When it comes to inheritance, JavaScript only has one construct: objects. Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. Nearly all objects in JavaScript are instances of Object which sits just below null on the top of a prototype chain.
>
> [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

All objects created using object literals have the same prototype object: `Object.prototype`.

The approaches to create prototype chains: 
- using [Object.create](examples/prototypal-inheritance-functional/prototypal-inheritance-functional.js)
- using [Class-syntax constructor functions](examples/prototypal-inheritance-classes/prototypal-inheritance-classes.js)

#### Destructuring assignment
Destructuring assignment
```javascript
let paint = {r: 5.0, g: 2.0, b: 3.0, a: 1.0};
let {r, g, b} = paint;  // r == 5.0; g == 2.0; b == 1.0
let {a : transparency} = paint;  // transparency = 1.0
```

#### Closures
When a function is created, a **closure scope** is also created (in a form of an invisible object) and stores parameters and variables created in the function.

#### Callbacks
A **callback** is a function that will be called at some future point, once a task has been completed.
1. You pass a callback function an input parameter to some asynchronous function.
1. The asynchronous function will call the callback function as soon as it has finished the asynchronous processing

- For a callback as a named function - see [example](examples/callbacks-named/callbacks-named.js)
- For a callback as fat arrow function (lambda) - see [example](examples/callbacks-fat-arrow/callbacks-fat-arrow.js)

#### Promises
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
A **promise** is an object that represents an asynchronous operation. It's either `pending` or `settled`, and if it is `settled` it's either `resolved` or `rejected`. It is impossible to synchronously get the value of a Promise; you still register a callback function(s) for the Promise to call a when the value is ready. Promises represent the future results of single asynchronous computations.
1. Some asynchronous function returns a `Promise` object, initially in `pending` state. 
1. On the promise object you use `.then()` to add a callback function. 
1. The promise object will eventually move to the `settled` state and contain the results of the asynchronous operation (`resolved`) or some error message (`rejected`). When it happens, the promise-registered callback is invoked.

See a working [example](examples/callbacks-promise-implementing/callbacks-promise-implementing.js) of how a function that returns a Promise can be implemented.

```javascript
// Registering 3 callbacks for one Promise
readFilePromise.then((contents) => {
  console.log("Callback 1");
})
readFilePromise.then((contents) => {
  console.log("Callback 2");
})
readFilePromise.then((contents) => {
  console.log("Callback 3");
})
```

There are a few practical aspects to know:
- The `promisify` function from `util` package can be used to convert a callback-based API to a promise-based one.
- The function you pass to `then()` is invoked asynchronously, even if the asynchronous computation is already complete when you call `then()`.

##### Promise Chains
The `then()` function wrapper a Promise on its own, encapsulating the value returned by the callback function. As a result, you can register sequential chain of callbacks using the following syntax `.then().then().then()` effectively creating the so called **promise chain**. If a preceding promise's callback returns some value, the subsequent promise's callback will be able to process it.
```javascript
// Creating a Promise Chain
readFilePromise
  .then((contents) => { console.log("Callback 1"); return contents.length })
  .then((contentsLength) => { console.log("Callback 2: "+contentsLength); return contentsLength*2 })
  .then((doubledContentsLength) => { console.log("Callback 3: "+doubledContentsLength) })
```

##### await-ing a promise inside an async function
> The `await` keyword takes a Promise and turns it back into a return value or a thrown exception.
>
> The expression `await p` waits until Promise `p` settles
>
> Because any code that uses `await` is asynchronous, there is one critical rule: you can only use the `await` keyword within functions that have been declared with the `async` keyword.
>
> Source: JavaScript: The Definitive Guide, 7th Edition by David Flanagan

Inside an `async`-prefixed function, it is possible to use the `await` keyword in front of a promise (usually returned by some asynchronous function which returns a promise).
The `await` keyword will effectively pause the `async`-prefixed function execution until the `await`-ed promise becomes settled (= resolved or rejected). It is important to remember that such a paused execution of an `async`hronous function, does not block the entire program.

```javascript
async function runReadFile (filePath) {
  let readFilePromise = readFile(filePath)
  let contents = await readFilePromise
  console.log("Step 1")
  console.log("Step 2") 
  console.log("Step 3")
}
runReadFile('../data/data1.csv').catch( (err) => { throw err } )
```
An `async` function always returns a promise. The promise will resolve to whatever is returned inside the async function body.

##### Parallelize await-ing multiple promises inside an async function
This code reads two files in a seqeunce:
```javascript
async function runReadTwoFiles (filePathsArray) {
  let readFile1Promise = readFile(filePathsArray[0])
  let contentsFile1 = await readFile1Promise
  let readFile2Promise = readFile(filePathsArray[1])
  let contentsFile2 = await readFile2Promise
  console.log("Reading finished")
}
```
This code reads two files **in parallel**:
```javascript
async function runParallelReadTwoFiles (filePathsArray) {
  let readFile1Promise = readFile(filePathsArray[0])
  let readFile2Promise = readFile(filePathsArray[1])
  let [contentsFile1, contentsFile2] = await Promise.all([readFile1Promise, readFile2Promise)]);
  console.log("Reading finished")
}
```
- If any of the promises fails, `Promise.all` will atomically reject.
- `Promise.allSettled` can be used to tolerate errors in favor of getting necessary data. See [example](examples/callbacks-promise-allsettled/callbacks-promise-allsettled.js).

#### Events
The `EventEmitter` is used to drive event-driven logic. See a working [example](examples/events/events.js).
```javascript
const ee = new EventEmitter()
// register event handler
ee.on('tresholdExceeded', (value) => { console.log('fat arrow event handler: Treshold Exceeded '+value) })
// some time later - emit the event
ee.emit('tresholdExceeded', 15)
```
- The `ee.emit` is used to emit an event and can be executed many times in many places.
- The `ee.on` registers an event handler. 
- The `ee.once` registers a single-use listener - a one-time event handler, which is removed as soon as a first event occurs.
- Emitting an event with `error` name will cause the event emitter to throw an exception unless an explicit listener for the `error` event has been registered

#### Aborting asynchronous operations
To cancel asynchronous operations, `AbortController` can be used:
- https://developer.mozilla.org/en-US/docs/Web/API/AbortController/AbortController

See a working [example](examples/events-aborting/events-aborting.js).

#### Error Handling
Throwing a predefined `TypeError`:
```javascript
if (typeof inputOne !== 'number') throw new TypeError('the input argument must be a number')
```
Defining a custom error class:
```javascript
class NotFiftyError extends Error {
  constructor (errorName = '') {
      super(errorName + ' cannot be 50')
      this.code = 'ERR_CANNOT_BE_FIFTY'
  }
  get name () {
      return 'NotFiftyError [' + this.code + ']'
  }
}
```
Throwing the above custom error outputs:
```
NotFiftyError [ERR_CANNOT_BE_FIFTY]: the input argument cannot be 50
...
code: 'ERR_CANNOT_BE_FIFTY'
```
See a working [example](examples/errors/errors.js).

The `try-catch` construct can be used to catch errors thrown in a **synchronous** function:
```javascript
try {
  const result = doSomethingSynchronously()
  result()
  console.log('result', result)
} catch (err) {
  if (err.code === 'ERR_CANNOT_BE_FIFTY') {
    console.error('Nope. 50 will not work')
  } else {
    console.error('Unknown error', err)
  }
}
```
Similarly, the `try-catch` construct can be used to catch errors thrown in an **asynchronous** function that `await`s asynchronous operations.

#### Buffers
`Buffer`s are used to represent a fixed-length sequence of bytes.

Allocating a zero-filled buffer that can hold 10 bytes:
```javascript
const buf1 = Buffer.alloc(10);
```

#### The global object
The global object is a regular JavaScript object whose properties are the globally defined identifiers that are available to a JavaScript program.

In Node, the global object has a property named `global`.

In web browsers, the Window object (`window`) serves as the global object for all JavaScript code contained in the browser window it represents. Web worker threads have a different global object: `self`.

ES2020 defines `globalThis` as the standard way to refer to the global object in any context


### Node.js
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
The Node.js platform is almost entirely represented by the node binary executable. 

To execute a JavaScript program: `node app.js`

To check the syntax of a program: `node --check app.js`

To preload (= execute first) a module (another JavaScript program): `node -r ./preload.js app.js`

By default, a **stack trace** will contain the last ten stack frames (function call sites) at the point where the trace occurred. The stack trace limit can be modified with the `--stack-trace-limit` flag.

To debug launch a program in Inspect mode:
```bash
node --inspect app.js
node --inspect-brk app.js # with an breakpoint at the beginning of the program
```
Node.js supports the [Chrome Devtools remote debugging protocol](https://nodejs.org/en/docs/guides/debugging-getting-started/). There are various tools (i.e. Chrome browser - `chrome://inspect`) that support the debugging process. The breakpoints are set and stepped through in the tool chosen for debugging.

#### Packages
A **package** is basically just a folder with a `package.json` file and one or more JavaScript files.
A Node.js application is also a package.

The `npm init` command creates (or updates) the `package.json` file.

The **dependencies** are installed with `npm install <name>` command. When you add a dependency:
1. Its name and version (i.e. `d`) are added to the `dependencies` field in the `package.json` file
1. The package files (and its dependencies) are added as a folder to `node_modules` folder inside the package folder
1. The `package-lock.json` file id added/updated to contain a map of all package dependencies with their exact versions

The `node_modules` folder must not be checked into Git. Check in the `package.json`. 
When you clone a repo, you will then use `npm install` to recreate the `node_modules` folder.

The `npm ls --depth=1000` describes the dependency tree of a package.

The **development dependencies** are tools that support the development process. You can install the packages as development dependencies by using `npm install` with  `--save-dev` option. The development dependencies are added to the `devDependencies` field in the `package.json` file.
```json
"dependencies": {
  "pino": "^7.6.2"
},
"devDependencies": {
  "standard": "^16.0.4"
}
```
When you want to install only production dependencies, but have some development dependencies in the `package.json` file, you can use `npm install` with `--production` option.

Packages are versioned using Semver format. For non-zero MAJOR numbers, `^MAJOR.MINOR.PATCH` is interpreted as `MAJOR.x.x.`

#### npm
The `npm` client is the package manager which comes bundled with Node.js. By default, the packages are downloaded from `npmjs.com` registry, which is the default module registry.

#### Programming Model
A Node program can read the **command-line arguments** from the array of strings `process.argv`.
The **environment variables** are available in the `process.env` object.
`_filename` in Node.js holds the path of the file currently being executed

> Node programs are often asynchronous and based on callbacks and event handlers. 
> The programs do not exit until they are done running the initial file and until all callbacks have been called and there are no more pending events
> A Node-based server program that listens for incoming network connections will theoretically run forever because it will always be waiting for more events.
>
> Source: JavaScript: The Definitive Guide, 7th Edition by David Flanagan

The default module for accessing the filesystem (`fs`) contains an asynchronous function (`fs.readFile`) for reading the contents of a file. Executing the function launches an asynchronous operation of reading the file. As soon as the contents have been read, the callback function is invoked and the contents are passed to that callback function.




#### Modules
A **module** is a unit of code. Packages expose modules, modules provide functionality.

Node had a module-system (`CommonJS`) before JavaScript was eventually equipped with one (`EcmaScript Modules`). The two module systems are not fully compatible. Node needs to know whether a loaded module is CommonJS or ESM.

##### CommonJS
In the Node’s CommonJS: 
- the `require()` function is used to import values into a module
- the `exports` object or the `module.exports` property are used to export values from a module
- every module is loaded synchronously

```javascript
'use strict'
const upper = (str) => {
  if (typeof str === 'symbol') str = str.toString()
  str += ''
  return str.toUpperCase()
}
module.exports = { upper: upper }
```

##### ESM
To get Node enforce EcmaScript Modules, you add the following line in the `package.json`:
```json
"type": "module"
```

In the EcmaScript Modules: 
- the `import` keyword is used to import values into a module
- the `export` keyword is used to export values from a module
- every module is loaded asynchronously

```javascript
// Use .mjs as extension or with "type": "module" in the package.json
export const upper = (str) => {
  if (typeof str === 'symbol') str = str.toString()
  str += ''
  return str.toUpperCase()
}
```

A Node application (or module) can contain both CJS and ESM files.

# Useful Links
- https://code.visualstudio.com/docs/editor/debugging#_launch-configurations
- https://code.visualstudio.com/docs/nodejs/nodejs-debugging
- https://nodejs.org/dist/latest-v16.x/docs/api/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript
- https://docs.npmjs.com/