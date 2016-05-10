var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './app/app.ts',
        './app/messages/services/gmail.api.service',
        './app/messages/services/letter-histogram.service',
        './app/messages/message-loader/message-loader.component',
        './app/messages/messages-view/messages-view.component',
        './node_modules/bootstrap/dist/js/bootstrap',
        './node_modules/angular-route/angular-route',
        './node_modules/d3/d3',
        './node_modules/lodash/lodash',
        './app/styles/main',
        './node_modules/bootstrap/dist/css/bootstrap',
        ],

    output: {
        filename: 'build.js',
        path: 'dist'
    },
    
    resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js', '.json']
    },
    
    devtool: "source-map",
    
    resolveLoader: {
        modulesDirectories: ["node_modules"]
    },
    
    devServer: {
        contentBase: 'dist'
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html',
            inject: 'body',
            hash: true
        })
    ],

    module: {
        loaders: [
            {
                test: /\.ts(x?)$/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'raw-loader'
            }
        ]
    }
}