var EventEmitter = require( '../../dist/event' ).EventEmitter;

/**
 * Define the business class and extends EventEmitter.
 */
var Endpoint = function () {
    EventEmitter.call( this );
};

Endpoint.prototype = Object.create( EventEmitter.prototype );

// Create the instance of Endpoint.
var instance = new Endpoint();

// Listen to event 'test'.
instance.addEventListener( 'test', function () {
    // TODO: Writing business code here...
} );

// Dispatch 'test' event.
instance.dispatchEvent( 'test' );