const { defineConfig } = require('@rspack/cli');
const path = require('path');

module.exports = defineConfig({
    entry: {
        setAnchor: './src/contentScript/setAnchor.jsx',
        selectWord: './src/contentScript/selectWord.jsx',
        background: './src/background.js',
        popUp: './src/pages/popUp/popUp.jsx',
        logIn: './src/pages/logIn/logIn.jsx',
        home: './src/pages/home/home.jsx',
        tutorial: './src/pages/tutorial/tutorial.jsx'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    watch: true,
    module: {
        rules: [{
            test: /\.png$/,
            type: 'asset'
        }],
    }
});