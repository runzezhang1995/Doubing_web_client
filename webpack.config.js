const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        demo: path.resolve(__dirname, 'src/client/demo.jsx'),

    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build/frontend'),
        publicPath: 'http://localhost:9002/',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules(?!\/react-calendar-timeline)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader',
                ],
            },

            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|ttc)$/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     minChunks: 2,
        // }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'source-map',
    devServer: {
        compress: true,
        port: 9002,
        contentBase: path.join(__dirname, 'public'),
        headers: { 'Access-Control-Allow-Origin': '*' },
        hot: true,
    },
};