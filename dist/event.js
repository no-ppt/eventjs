(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(exports);
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod.exports);
	        global.EventEmitter = mod.exports;
	    }
	})(this, function (exports) {
	    'use strict';

	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });

	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }

	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }

	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();

	    /**
	     * Wildcard event type.
	     *
	     * @constant
	     * @type {string}
	     */
	    var EVENT_WILDCARD = '*';

	    /**
	     * EventEmitter is an improved implementation of event-driven.
	     * All EventEmitters emit the event 'ListenerRegistered' when new listeners are added and
	     * 'ListenerRemoved' when a listener is removed.
	     *
	     * @author hermit
	     * @version 1.1.0
	     * @since 1.0.0
	     */

	    var EventEmitter = exports.EventEmitter = function () {

	        /**
	         * Construct a event emitter object.
	         * @constructor
	         */

	        function EventEmitter() {
	            _classCallCheck(this, EventEmitter);

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


	        _createClass(EventEmitter, [{
	            key: 'addEventListener',
	            value: function addEventListener(type, listener) {

	                // Check parameter legality.
	                this._checkEventType(type);
	                this._checkEventListener(listener);

	                // Emit 'ListenerRegistered' event before registers the specified listener.
	                this.dispatchEvent('ListenerRegistered', type, listener);

	                // Registers the specified listener.
	                if (!this._events.has(type)) {
	                    this._events.set(type, []);
	                }
	                this._events.get(type).push(listener);

	                // Return current context.
	                return this;
	            }

	            /**
	             * Alias to {@code #addEventListener}.
	             */

	        }, {
	            key: 'addListener',
	            value: function addListener(type, listener) {
	                return this.addEventListener(type, listener);
	            }

	            /**
	             * Alias to {@code #addEventListener}.
	             */

	        }, {
	            key: 'attachEvent',
	            value: function attachEvent(type, listener) {
	                return this.addEventListener(type, listener);
	            }

	            /**
	             * Alias to {@code #addEventListener}.
	             */

	        }, {
	            key: 'on',
	            value: function on(type, listener) {
	                return this.addEventListener(type, listener);
	            }

	            /**
	             * Removes the event listener previously registered with {@code #addEventListener()}.
	             *
	             * @param type      A string representing the event type to listen for.
	             * @param listener  The function to remove from the target.
	             *
	             * @returns {EventEmitter}
	             */

	        }, {
	            key: 'removeEventListener',
	            value: function removeEventListener(type, listener) {

	                // Check parameter legality.
	                this._checkEventType(type);
	                this._checkEventListener(listener);

	                // Return directly if no listener listening to the specified event type.
	                if (!this._events.has(type)) {
	                    return this;
	                }

	                var listeners = this._events.get(type);
	                var position = listeners.indexOf(listener);

	                // Return if the specified listener is not registered.
	                if (position < 0) {
	                    return this;
	                }

	                // Remove the specified listener.
	                if (listeners.length === 1) {
	                    this._events.delete(type);
	                } else {
	                    listeners.splice(position, 1);
	                }

	                // Emit 'ListenerRemoved' event after the listener has been removed.
	                this.dispatchEvent('ListenerRemoved', type, listener);

	                // Return current context.
	                return this;
	            }

	            /**
	             * Alias to {@code #removeEventListener()}.
	             */

	        }, {
	            key: 'removeListener',
	            value: function removeListener(type, listener) {
	                this.removeEventListener(type, listener);
	            }

	            /**
	             * Alias to {@code #removeEventListener()}.
	             */

	        }, {
	            key: 'detachEvent',
	            value: function detachEvent(type, listener) {
	                this.removeEventListener(type, listener);
	            }

	            /**
	             * Alias to {@code #removeEventListener()}.
	             */

	        }, {
	            key: 'off',
	            value: function off(type, listener) {
	                this.removeEventListener(type, listener);
	            }

	            /**
	             * Clear all listener(s) which listening for the specified event type.
	             *
	             * @param type      A string representing the event type to listen for.
	             *
	             * @returns {EventEmitter}
	             */

	        }, {
	            key: 'removeAllListeners',
	            value: function removeAllListeners(type) {

	                // Check parameter legality.
	                this._checkEventType(type);

	                // Return directly if no listener listening to the specified event type.
	                if (!this._events.has(type)) {
	                    return this;
	                }

	                // Remove all listeners which listening for the specified type.
	                var listeners = this._events.get(type);
	                this._events.delete(type);

	                // Emit 'ListenerRemoved' event after listeners has been removed.
	                this.dispatchEvent('ListenerRemoved', type, listeners);

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

	        }, {
	            key: 'dispatchEvent',
	            value: function dispatchEvent(type) {
	                var _this = this;

	                for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                    params[_key - 1] = arguments[_key];
	                }

	                // Check parameter legality.
	                this._checkEventType(type);

	                // Dispatch event to all listeners which listening to the specified event type.
	                if (this._events.has(type)) {
	                    this._events.get(type).forEach(function (listener) {
	                        _this._dispatch.apply(_this, [type, listener].concat(params));
	                    }, this);
	                }

	                // Dispatch event to all listeners which listening on the wildcard event type.
	                if (this._events.has(EVENT_WILDCARD)) {
	                    this._events.get(EVENT_WILDCARD).forEach(function (listener) {
	                        _this._dispatch.apply(_this, [type, listener].concat(params));
	                    }, this);
	                }

	                return this;
	            }

	            /**
	             * Alias to {@code #dispatchEvent()}.
	             */

	        }, {
	            key: 'fireEvent',
	            value: function fireEvent(type) {
	                for (var _len2 = arguments.length, params = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                    params[_key2 - 1] = arguments[_key2];
	                }

	                return this.dispatchEvent.apply(this, [type].concat(params));
	            }

	            /**
	             * Alias to {@code #dispatchEvent()}.
	             */

	        }, {
	            key: 'emit',
	            value: function emit(type) {
	                for (var _len3 = arguments.length, params = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	                    params[_key3 - 1] = arguments[_key3];
	                }

	                return this.dispatchEvent.apply(this, [type].concat(params));
	            }

	            /**
	             * Returns the number of listeners listening to the specified event type.
	             *
	             * @param type          A string representing the event type to get listener count.
	             *
	             * @returns {number}    Current object.
	             */

	        }, {
	            key: 'listenerCount',
	            value: function listenerCount(type) {
	                this._checkEventType(type);
	                return this._events.get(type) ? this._events.get(type).length : 0;
	            }
	        }, {
	            key: '_checkEventType',
	            value: function _checkEventType(type) {
	                if (!type || typeof type !== 'string' || type.length === 0) {
	                    throw new Error('Event type must be a string!', type);
	                }
	            }
	        }, {
	            key: '_checkEventListener',
	            value: function _checkEventListener(listener) {
	                if (!listener || !(listener instanceof Function)) {
	                    throw new Error('Listener must be a function!', listener);
	                }
	            }
	        }, {
	            key: '_dispatch',
	            value: function _dispatch(type, listener) {
	                for (var _len4 = arguments.length, params = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
	                    params[_key4 - 2] = arguments[_key4];
	                }

	                listener.call.apply(listener, [this, {
	                    target: this,
	                    type: type,
	                    arguments: [].concat(params),
	                    timestamp: new Date().getTime()
	                }].concat(params));
	            }
	        }]);

	        return EventEmitter;
	    }();
	});

/***/ }
/******/ ])
});
;