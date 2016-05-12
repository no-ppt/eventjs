# Event.js

Event.js is an improved JavaScript event-driven framework running on Node.js and in the browser.

[![Join the chat at https://gitter.im/no-ppt/eventjs](https://badges.gitter.im/no-ppt/eventjs.svg)](https://gitter.im/no-ppt/eventjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/no-ppt/eventjs.svg?branch=master)](https://travis-ci.org/no-ppt/eventjs)
[![Coverage Status](https://coveralls.io/repos/github/no-ppt/eventjs/badge.svg?branch=master)](https://coveralls.io/github/no-ppt/eventjs?branch=master)

[![Dependency Status](https://david-dm.org/no-ppt/eventjs.svg)](https://david-dm.org/no-ppt/eventjs)
[![devDependency Status](https://david-dm.org/no-ppt/eventjs/dev-status.svg)](https://david-dm.org/no-ppt/eventjs#info=devDependencies)

## Installation

install with npm:

```Shell
$ npm install --save no-ppt/eventjs
```

## Getting Started

### Using event emitter separately

In Node.js:

```JavaScript
var EventEmitter = require('eventjs').EventEmitter;

// Create event emitter.
var emitter = new EventEmitter();

// Listen to something you needed.
emitter.addEventListener( 'change', function( event ) {
    // TODO: Writting business code here...
} );

// Dispatch event.
emitter.dispatchEvent( 'change' );
```

In browser with require.js:

```JavaScript
define( [ 'eventjs' ], function( eventjs ) {

    // Create event emitter.
    var emitter = new eventjs.EventEmitter();

    // Listen to something you needed.
    emitter.addEventListener( 'change', function( event ) {
        // TODO: Writting business code here...
    } );

    // Dispatch event.
    emitter.dispatchEvent( 'change' );
} );
```

### Extends the EventEmitter

In Node.js:

```JavaScript
var EventEmitter = require( 'eventjs' ).EventEmitter;

/**
 * Define the business class and extends EventEmitter.
 */
var Endpoint = function() {
    EventEmitter.call( this );
};
Endpoint.prototype = Object.create( EventEmitter.prototype );

// Create the instance of Endpoint.
var instance = new Endpoint();

// Listen to event 'test'.
instance.addEventListener( 'test', function() {
    // TODO: Writing business code here...
} );

// Dispatch 'test' event.
instance.dispatchEvent( 'test' );
```

In browser with require.js:

```JavaScript
define( [ 'eventjs' ], function( eventjs ) {

    var EventEmitter = eventjs.EventEmitter;

    /**
     * Define the business class and extends EventEmitter.
     */
    var Endpoint = function() {
        EventEmitter.call( this );
    };
    Endpoint.prototype = Object.create( EventEmitter.prototype );

    // Create the instance of Endpoint.
    var instance = new Endpoint();

    // Listen to event 'test'.
    instance.addEventListener( 'test', function() {
        // TODO: Writing business code here...
    } );

    // Dispatch 'test' event.
    instance.dispatchEvent( 'test' );
} );
```

## Running the Unit Tests

Make sure you have the necessary dependencies:

```
$ npm install
```

Run the unit test with NPM:

```
$ npm test
```

Generate the coverage report:
```
$ npm run coverage
```

## Contributing

If you want to contribute to this project, please send email to [hermit@no-ppt.com](mailto:hermit@no-ppt.com)

## License

Copyright © 2016 No-PPT.com and other contributors.

Licensed under the MIT License
