module.exports = {
    context: __dirname + '/.tmp',
    entry  : './EventJS',
    output : {
        libraryTarget: 'umd',
        filename     : __dirname + '/dist/event.js'
    }
};