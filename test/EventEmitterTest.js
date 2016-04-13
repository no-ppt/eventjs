import should       from 'should';
import EventEmitter from '../src/EventEmitter';

const EMPTY_CALLBACK = function () {
};

describe( 'EventEmitter', () => {

    let target;

    beforeEach( 'create new EventEmitter', () => {
        target = new EventEmitter();
    } );

    afterEach( 'delete current EventEmitter', ()=> {
        target = null;
    } );

    describe( '#constructor', () => {
        it( 'should not throw an error', ()=> {
            (function () {
                new EventEmitter();
            }).should.not.throw();
        } );
    } );

    describe( '#addEventListener', () => {

        context( 'when type and listener is legal', () => {

            it( 'should emit "ListenerRegistered" event', ( done ) => {
                target.addEventListener( 'ListenerRegistered', () => {
                    done();
                } );
                target.addEventListener( 'test', EMPTY_CALLBACK );
            } );

            it( 'should increase listener count', () => {
                let before = target.listenerCount( 'test' );
                target.addEventListener( 'test', EMPTY_CALLBACK );
                target.listenerCount( 'test' ).should.equal( before + 1 );
            } );
        } );

        context( 'when type is not present', () => {

            it( 'should receive an error', ( done ) => {
                try {
                    target.addEventListener( null, EMPTY_CALLBACK );
                } catch ( e ) {
                    done();
                }
            } )
        } );

        context( 'when type is not a string', () => {

            it( 'should receive an error', ( done ) => {
                try {
                    target.addEventListener( 1, EMPTY_CALLBACK );
                } catch ( e ) {
                    done();
                }
            } )
        } );

        context( 'when type is an empty string', () => {

            it( 'should receive an error', ( done ) => {
                try {
                    target.addEventListener( '', EMPTY_CALLBACK );
                } catch ( e ) {
                    done();
                }
            } )
        } );

        context( 'when listener is not present', () => {

            it( 'should receive an error', ( done ) => {
                try {
                    target.addEventListener( 'test', null );
                } catch ( e ) {
                    done();
                }
            } )
        } );

        context( 'when listener is not a function', () => {

            it( 'should receive an error', ( done ) => {
                try {
                    target.addEventListener( 'test', {} );
                } catch ( e ) {
                    done();
                }
            } )
        } );
    } );

    describe( '#dispatchEvent', () => {

        context( 'when type is not present', () => {

            it( 'should receive an error', ( done ) => {
                try {
                    target.dispatchEvent( null );
                } catch ( e ) {
                    done();
                }
            } );
        } );

        context( 'when parameter is not present', () => {

            it( 'should dispatch an event with empty parameter', ( done ) => {
                target.addEventListener( 'test', ( event ) => {
                    event.target.should.equal( target );
                    event.type.should.equal( 'test' );
                    event.arguments.length.should.equal( 0 );
                    event.timestamp.should.be.ok();
                    done();
                } );
                target.dispatchEvent( 'test' );
            } );
        } );

        context( 'when parameter is present', () => {

            it( 'should dispatch an event with parameters', ( done ) => {
                target.addEventListener( 'test', ( event, a, b, c ) => {
                    event.target.should.equal( target );
                    event.type.should.equal( 'test' );
                    event.arguments.length.should.equal( 3 );
                    event.timestamp.should.be.ok();
                    a.should.equal( 1 );
                    b.should.equal( 2 );
                    c.should.equal( 3 );
                    done();
                } );
                target.dispatchEvent( 'test', 1, 2, 3 );
            } );
        } );


    } );

    describe( '#listenerCount', () => {

        context( 'when type is not present', () => {
            it( 'should receive an error', ( done ) => {
                try {
                    target.listenerCount();
                } catch ( e ) {
                    done();
                }
            } );
        } );

        it( 'should return the listener count', () => {
            target.listenerCount( 'test' ).should.equal( 0 );
            target.addEventListener( 'test', EMPTY_CALLBACK );
            target.listenerCount( 'test' ).should.equal( 1 );
        } )
    } );

    describe( '#removeEventListener', () => {

        context( 'when type and listener is legal', () => {

            it( 'should emit "ListenerRemoved" event', ( done ) => {
                target.addEventListener( 'ListenerRemoved', () => {
                    done();
                } );
                target.addEventListener( 'test', EMPTY_CALLBACK );
                target.removeEventListener( 'test', EMPTY_CALLBACK );
            } );

            it( 'should decrease listener count', () => {
                let before = target.listenerCount( 'test' );
                target.addEventListener( 'test', EMPTY_CALLBACK );
                target.listenerCount( 'test' ).should.equal( before + 1 );
                target.removeEventListener( 'test', EMPTY_CALLBACK );
                target.listenerCount( 'test' ).should.equal( before );
            } );
        } );

        context( 'when type is not present', () => {

            it( 'should receive an error', ( done ) => {
                try {
                    target.removeEventListener( null, EMPTY_CALLBACK );
                } catch ( e ) {
                    done();
                }
            } )
        } );

        context( 'when type is not a string', () => {

            it( 'should receive an error', ( done ) => {
                try {
                    target.removeEventListener( 1, EMPTY_CALLBACK );
                } catch ( e ) {
                    done();
                }
            } )
        } );

        context( 'when type is an empty string', () => {

            it( 'should receive an error', ( done ) => {
                try {
                    target.removeEventListener( '', EMPTY_CALLBACK );
                } catch ( e ) {
                    done();
                }
            } )
        } );

        context( 'when listener is not present', () => {

            it( 'should receive an error', ( done ) => {
                try {
                    target.removeEventListener( 'test', null );
                } catch ( e ) {
                    done();
                }
            } )
        } );

        context( 'when listener is not a function', () => {

            it( 'should receive an error', ( done ) => {
                try {
                    target.removeEventListener( 'test', {} );
                } catch ( e ) {
                    done();
                }
            } )
        } );
    } );

    describe( '#removeAllListeners', () => {

        context( 'when type is legal', () => {

            it( 'should emit "ListenerRemoved" event', ( done ) => {
                target.addEventListener( 'ListenerRemoved', () => {
                    done();
                } );
                target.addEventListener( 'test', EMPTY_CALLBACK );
                target.removeAllListeners( 'test' );
            } );

            it( 'should put removed listeners into the event', ( done ) => {
                let fun1 = function () {
                };
                let fun2 = function () {
                };
                target.addEventListener( 'test', fun1 );
                target.addEventListener( 'test', fun2 );
                target.addEventListener( 'ListenerRemoved', event => {
                    event.target.should.equal( target );
                    event.type.should.equal( 'ListenerRemoved' );
                    event.arguments.length.should.equal( 2 );
                    event.arguments[ 0 ].should.equal( 'test' );
                    event.arguments[ 1 ].should.be.instanceof( Array );
                    event.arguments[ 1 ].length.should.equal( 2 );
                    event.arguments[ 1 ][ 0 ].should.equal( fun1 );
                    event.arguments[ 1 ][ 1 ].should.equal( fun2 );
                    event.timestamp.should.be.ok();
                    done();
                } );
                target.removeAllListeners( 'test' );
            } );
        } );

        context( 'when type is not present', () => {

            it( 'should receive an error', ( done ) => {
                try {
                    target.removeAllListeners( null );
                } catch ( e ) {
                    done();
                }
            } )
        } );
    } );
} );