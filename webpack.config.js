module.exports = {
    entry : './src/EventEmitter.js',
    output: {
        library      : 'eventjs',
        libraryTarget: 'umd',
        filename     : __dirname + '/dist/event.js'
    },
    module: {
        loaders: [
            {
                test   : /\.js$/,
                exclude: /node_modules/,
                loader : 'babel'
            }
        ]
    }
};