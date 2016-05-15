var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'bootstrap/dist/css/bootstrap.css',
        './app/app.ts'
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
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'raw-loader'
            },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
            { test: /\.json$/, loader: 'json-loader' },
        ]
    }
}