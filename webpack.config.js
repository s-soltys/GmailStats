var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./app/app.ts'],

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