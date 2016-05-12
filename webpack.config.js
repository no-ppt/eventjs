module.exports = {
    context: __dirname + '/.tmp',
    entry  : './EventEmitter',
    output : {
        libraryTarget: 'umd',
        filename     : __dirname + '/dist/event.js'
    }
};