# Changelog

## 1.0.0 - 2016.04.13

- Add `EventDriven` class to implementation event-driven API.
  - `addEventListener(type, listener)`, `addListener(type, listener)`, `attachEvent(type, listener)`, `on(type, listener)` for register the specified listener on the object.
  - `removeEventListener(type, listener)`, `removeListener(type, listener)`, `detachEvent(type, listener)`, `off(type, listener)` for remove the event listener from the object.
  - `removeAllListeners(type)` for clear all listener(s) which listening for the specified event type.
  - `dispatchEvent(type, ...params)`, `fireEvent(type, ...params)`, `emit(type, ...params)` for dispatch an event.
  - `listenerCount(type)` for get the number of listeners listening to the specified event type.