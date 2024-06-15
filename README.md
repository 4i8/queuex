# **queuex**

**Queuex simplifies managing tasks in sequence, making it easy to handle various operations one after another. Whether you're processing data or handling requests, Queuex ensures tasks are organized and executed efficiently, streamlining your workflow.**

<div align="center">
  <p>
 <a href="https://www.npmjs.com/package/queuex"><img src="https://img.shields.io/npm/v/queuex.svg?style=for-the-badge" alt="NPM version" /></a>
 <a href="https://www.npmjs.com/package/queuex"><img src="https://img.shields.io/npm/dt/queuex.svg?maxAge=3600&style=for-the-badge" alt="NPM downloads" /></a>
 <a href="https://github.com/4i8/queuex.git">
    <img src="https://img.shields.io/badge/github-black?style=for-the-badge&logo=github&logoColor=white" alt="github"/>
  </a>
  </p>
</div>

## Table of Contents

- [Compatibility](#compatibility)
- [Installation](#installation)
- [Example](#example)
  - [CommonJS](#commonjs)
  - [ES6](#es6)
  - [What is the use of a namespace?](#what-is-the-use-of-a-namespace)
- [API](#api)
  - [constructor(namespace, callback)](#constructornamespace-callback)
  - [next()](#next)
  - [push(task)](#pushtask)
  - [concat(tasks)](#concattasks)
  - [kill()](#kill)
- [License](#license)

## Compatibility

- **ECMAScript Modules (ESM)**
- **CommonJS (CJS)**
- **Bun**

# **Installation**

```sh-session
npm install queuex
yarn add queuex
```

# **Example**

## Note

Every push() or concat() will start your queuex if it is not already running so you don't have to worry about starting it manually

### CommonJS

this is just an example, you can use queuex for anything

```js
const Queuex = require("queuex");

const namespace = new Queuex("namespace", (value, next, index) => {
  // Simulate an asynchronous task using setTimeout
  console.log(`Task ${index + 1}: ${value.message}`);
  setTimeout(() => {
    console.log(`Completed task ${index + 1}`);
    next(); // when you are done, call next() to move to the next task
  }, value.delay);
});

let tasks = [
  {
    message: "This is task 1",
    delay: 1000, // 1 second delay
  },
  {
    message: "This is task 2",
    delay: 500, // 0.5 second delay
  },
  {
    message: "This is task 3",
    delay: 2000, // 2 seconds delay
  },
];

// concat is a method that adds an array of items to the namespace queue
namespace.concat(tasks);

// push is a method that adds a single item to the namespace queue
namespace.push({
  message: "This is task 4",
  delay: 1500, // 1.5 seconds delay
});
// every push or concat will start the namespace if it is not already running
```

### ES6

this is just an example, you can use queuex for anything

```js
import Queuex from "queuex";
const namespace = new Queuex("namespace", (value, next, index) => {
  // Simulate an asynchronous task using setTimeout
  console.log(`Task ${index + 1}: ${value.message}`);
  setTimeout(() => {
    console.log(`Completed task ${index + 1}`);
    next(); // when you are done, call next() to move to the next task
  }, value.delay);
});

let tasks = [
  {
    message: "This is task 1",
    delay: 1000, // 1 second delay
  },
  {
    message: "This is task 2",
    delay: 500, // 0.5 second delay
  },
  {
    message: "This is task 3",
    delay: 2000, // 2 seconds delay
  },
];

// concat is a method that adds an array of items to the namespace queue
namespace.concat(tasks);

// push is a method that adds a single item to the namespace queue
namespace.push({
  message: "This is task 4",
  delay: 1500, // 1.5 seconds delay
});
// every push or concat will start the namespace if it is not already running
```

### What is the use of a namespace?

To avoid throwing errors, do not use the same namespace more than once in the same process.

#### `test/index.js`

```js
const tools = new queuex("tools", async (value, next, index) => {
  // do something...
  console.log(value);
  next(); //hello2
});
tools.push("hello");
```

#### `test/inside/tools.js`

**to index.js in your queuex instance named tools**

```js
const tools = new queuex("tools");
tools.push("hello2");
//or
tools.concat(["hello2", "hello3"]);
```

# API

<p><strong> queuex provides the following methods:</strong>

> ##### `constructor(namespace, callback)`
>
> Creates a new instance of the queuex class with the provided namespace and callback function.

- namespace (string) - The namespace for the Queuex sequence.
- callback (Function) - The callback function that takes a value, a next function, and an index as parameters.

> #### `next()`
>
> Moves the Queuex sequence to the next task and runs it.

> #### `push(task)`
>
> Adds a new task to the end of the Queuex sequence.

- task (any) - The task to add to the Queuex sequence.

> #### `concat(tasks)`
>
> Adds an array of tasks to the end of the Queuex sequence.

- tasks (Array) - The array of tasks to add to the Queuex sequence.

> #### `kill()`
>
> Stops the current Queuex sequence and prevents any remaining tasks from running.

# License

queuex is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)

</p>
