const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                mode: "development",
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            // ... other rules ...
        ],
    },
    // other webpack settings...
    plugins: [
        new NodePolyfillPlugin()
        // ...
    ],
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "presets": ["@babel/preset-env", "@babel/preset-react"]
        }
    },
    mode: "development"
};