/**
 * Wildcard event type.
 *
 * @constant
 * @type {string}
 */
const EVENT_WILDCARD = '*';

/**
 * EventEmitter is an improved implementation of event-driven.
 * All EventEmitters emit the event 'ListenerRegistered' when new listeners are added and
 * 'ListenerRemoved' when a listener is removed.
 *
 * @author hermit
 * @version 1.0.0
 * @since 1.0.0
 */
export default class EventEmitter {

    /**
     * Construct a event emitter object.
     * @constructor
     */
    constructor() {
        this._events = new Map();
    }

    /**
     * The {@code EventEmitter.addEventListener()} function registers the specified listener on
     * the EventEmitter it's called on.
     *
     * @param type      A string representing the event type to listen for.
     * @param listener  The function that will be applied when an event of the specified type
     *     occurs.
     *
     * @returns {EventEmitter}  Current object.
     */
    addEventListener( type, listener ) {

        // Check parameter legality.
        this._checkEventType( type );
        this._checkEventListener( listener );

        // Emit 'ListenerRegistered' event before registers the specified listener.
        this.dispatchEvent( 'ListenerRegistered', type, listener );

        // Registers the specified listener.
        if ( !this._events.has( type ) ) {
            this._events.set( type, [] );
        }
        this._events.get( type ).push( listener );

        // Return current context.
        return this;
    }

    /**
     * Alias to {@code #addEventListener}.
     */
    addListener( type, listener ) {
        return this.addEventListener( type, listener );
    }

    /**
     * Alias to {@code #addEventListener}.
     */
    attachEvent( type, listener ) {
        return this.addEventListener( type, listener );
    }

    /**
     * Alias to {@code #addEventListener}.
     */
    on( type, listener ) {
        return this.addEventListener( type, listener );
    }

    /**
     * Removes the event listener previously registered with {@code #addEventListener()}.
     *
     * @param type      A string representing the event type to listen for.
     * @param listener  The function to remove from the target.
     *
     * @returns {EventEmitter}
     */
    removeEventListener( type, listener ) {

        // Check parameter legality.
        this._checkEventType( type );
        this._checkEventListener( listener );

        // Return directly if no listener registered to the specified event type..
        if ( !this._events.has( type ) ) {
            return this;
        }

        let listeners = this._events.get( type );
        let position  = listeners.indexOf( listener );

        // Return if the specified listener is not registered.
        if ( position < 0 ) {
            return this;
        }

        // Remove the specified listener.
        if ( listeners.length === 1 ) {
            this._events.delete( type );
        } else {
            listeners.splice( position, 1 );
        }

        // Emit 'ListenerRemoved' event after the listener has been removed.
        this.dispatchEvent( 'ListenerRemoved', type, listener );

        // Return current context.
        return this;
    }

    /**
     * Alias to {@code #removeEventListener()}.
     */
    removeListener( type, listener ) {
        this.removeEventListener( type, listener );
    }

    /**
     * Alias to {@code #removeEventListener()}.
     */
    detachEvent( type, listener ) {
        this.removeEventListener( type, listener );
    }

    /**
     * Alias to {@code #removeEventListener()}.
     */
    off( type, listener ) {
        this.removeEventListener( type, listener );
    }

    /**
     * Clear all listener(s) which listening for the specified event type.
     *
     * @param type      A string representing the event type to listen for.
     *
     * @returns {EventEmitter}
     */
    removeAllListeners( type ) {

        // Check parameter legality.
        this._checkEventType( type );

        // Return directly if no listener registered to the specified event type.
        if ( !this._events.has( type ) ) {
            return this;
        }

        // Remove all listeners which listening for the specified type.
        let listeners = this._events.get( type );
        this._events.delete( type );

        // Emit 'ListenerRemoved' event after listeners has been removed.
        this.dispatchEvent( 'ListenerRemoved', type, listeners );

        // Return current context.
        return this;
    }

    /**
     * Dispatches an event at the specified EventTarget, invoking the affected listeners in the
     * appropriate order.
     * The wildcard listener will dispatched later than the concrete listener.
     *
     * @param type      A string representing the event type to dispatch to.
     * @param params    Parameters for the event listeners.
     *
     * @returns {EventEmitter}  Current object.
     */
    dispatchEvent( type, ...params ) {

        // Check parameter legality.
        this._checkEventType( type );

        // Dispatch event to all listeners which listening to the specified event type.
        if ( this._events.has( type ) ) {
            this._events.get( type ).forEach( listener => {
                this._dispatch( type, listener, ...params );
            }, this )
        }

        // Dispatch event to all listeners which listening on the wildcard event type.
        if ( this._events.has( EVENT_WILDCARD ) ) {
            this._events.get( EVENT_WILDCARD ).forEach( listener => {
                this._dispatch( type, listener, ...params );
            }, this );
        }

        return this;
    }

    /**
     * Alias to {@code #dispatchEvent()}.
     */
    fireEvent( type, ...params ) {
        return this.dispatchEvent( type, ...params );
    }

    /**
     * Alias to {@code #dispatchEvent()}.
     */
    emit( type, ...params ) {
        return this.dispatchEvent( type, ...params );
    }

    /**
     * Returns the number of listeners listening to the specified event type.
     *
     * @param type          A string representing the event type to get listener count.
     *
     * @returns {number}    Current object.
     */
    listenerCount( type ) {
        this._checkEventType( type );
        return this._events.get( type ) ? this._events.get( type ).length : 0;
    }

    _checkEventType( type ) {
        if ( !type || typeof type !== 'string' || type.length === 0 ) {
            throw new Error( 'Event type must be a string!', type );
        }
    }

    _checkEventListener( listener ) {
        if ( !listener || !(listener instanceof Function) ) {
            throw new Error( 'Listener must be a function!', listener );
        }
    }

    _dispatch( type, listener, ...params ) {
        listener.call( this, {
            target   : this,
            type     : type,
            arguments: [ ...params ],
            timestamp: new Date().getTime()
        }, ...params );
    }
}