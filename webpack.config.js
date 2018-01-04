const path = require('path')

const DIST_DIR = path.resolve(__dirname, 'dist')
const SRC_DIR = path.resolve(__dirname, 'src')

const config = {
    entry: ['babel-polyfill', './src/index.js'],

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                include: SRC_DIR,
                exclude: /node_modules/,
                options: {
                    presets: [
                        'react',
                        'stage-0',
                        [
                            'env', {
                                targets: { browsers: ['last 2 versions'] }
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'css-loader' }
                ]
            }
        ]
    }
};

module.exports = config
