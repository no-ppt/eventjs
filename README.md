# Event.js

Event.js is an improved JavaScript event-driven framework running on Node.js and in the browser.

[![Join the chat at https://gitter.im/no-ppt/eventjs](https://badges.gitter.im/no-ppt/eventjs.svg)](https://gitter.im/no-ppt/eventjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/no-ppt/eventjs.svg?branch=master)](https://travis-ci.org/no-ppt/eventjs)

[![Dependency Status](https://david-dm.org/no-ppt/eventjs.svg)](https://david-dm.org/no-ppt/eventjs)
[![devDependency Status](https://david-dm.org/no-ppt/eventjs/dev-status.svg)](https://david-dm.org/no-ppt/eventjs#info=devDependencies)

## Installation

install with npm:

```Shell
$ npm install --save noppt/eventjs
```

## Getting Started

In Node.js:

```JavaScript
var EventEmitter = require( 'eventjs' ).default.EventEmitter;

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

    var EventEmitter = eventjs.default.EventEmitter;

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

## Contributing

If you want to contribute to this project, please send email to [hermit@no-ppt.com](mailto:hermit@no-ppt.com)

## License

Copyright © 2016 No-PPT.com and other contributors.

Licensed under the MIT License