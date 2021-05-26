const path = require('path');
const BomPlugin = require('webpack-utf8-bom');

const libsPath = path.resolve(__dirname, "_libs");
const appPath = path.resolve(__dirname, "app");
const componentsPath = path.resolve(__dirname, "app/components");
const pagesPath = path.resolve(__dirname, "app/pages");

module.exports = {
    entry: {
        thesis: './app/main.js'  //entry point
    },
    output: {
        path: path.resolve(__dirname, './dist/_js'),  //path resolved for main.js+imports
        filename: '[name].js'   // [name] aka thesis
    },
    module: {
        rules: [{
            test: /\.html$/,  //gia katalhksh html
            use: [{
                loader: 'html-loader',  //use ton html loader
                options: {
                    minimize: false  //min kaneis minimize!
                }
            }]
        }, {
            test: /\.svg$/,                
            loader: 'svg-inline-loader'   
        }, {
            test: /\.(png|jpg|gif)$/,    
            exclude: /\.(html)$/,     
            use: [{
                loader: 'file-loader',   
                options: {}              
            }]
        }]
    },

    resolve: {
        alias: {  //alias sta paths gia eykola imports
            "app": appPath,
            "components": componentsPath,
            "pages": pagesPath,
            "jquery": libsPath + "/jquery/jquery.min.js",
            "jQuery": "jquery",
            "jquery-ui": libsPath + "/jquery-ui/jquery-ui.min.js",
            "knockout": libsPath + "/knockout/knockout.js",
            "bootstrap":libsPath + "/bootstrap/bootstrap.min.js",
            "bootstrap-esm":libsPath + "/bootstrap/bootstrap.esm.min.js",
            "bootstrap-bundle":libsPath + "/bootstrap/bootstrap.bundle.min.js"

        }
    },

    plugins: [
        new BomPlugin(true)   //gia unicode
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                eaLib: {
                    test: /[\\/]_libs\\ea\\ea.js/,  //rwta simo
                    name: 'ea',
                    chunks: 'all'
                },
                commons: {
                    test: /[\\/]_libs\\(jquery|jquery-ui|knockout|bootstrap|bootstrap-esm|bootstrap-bundle)[\\/]/,  //vendor biblio8hkes
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
}