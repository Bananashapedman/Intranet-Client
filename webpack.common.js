const path = require('path');
const BomPlugin = require('webpack-utf8-bom');

const libsPath = path.resolve(__dirname, "_libs");
const appPath = path.resolve(__dirname, "app");
const componentsPath = path.resolve(__dirname, "app/pages/Dashboard");
const pagesPath = path.resolve(__dirname, "app/pages");

module.exports = {
    entry: {
        thesis: './app/main.js' 
    },
    output: {
        path: path.resolve(__dirname, './dist/_js'), 
        filename: '[name].js'  
    },
    module: {
        rules: [{
            test: /\.html$/,  
            use: [{
                loader: 'html-loader',  
                options: {
                    minimize: false 
                }
            }]
        }, {
            test: /\.svgcc$/,                
            loader: 'svg-inline-loader'   
        }, {
            test: /\.(pngcc|jpgccc|gifccc)$/,    
            exclude: /\.(html)$/,     
            use: [{
                loader: 'file-loader',   
                options: {}              
            }]
        }]
    },

    resolve: {
        alias: {  
            "app": appPath,
            "components": componentsPath,
            "pages": pagesPath,
            "jquery": libsPath + "/jquery/jquery.min.js",
            "jQuery": "jquery",
            "jquery-ui": libsPath + "/jquery-ui/jquery-ui.min.js",
            "knockout": libsPath + "/knockout/knockout.js",
            // "bootstrap":libsPath + "/bootstrap/bootstrap.min.js",
            // "bootstrap-esm":libsPath + "/bootstrap/bootstrap.esm.min.js",
            // "bootstrap-bundle":libsPath + "/bootstrap/bootstrap.bundle.min.js"

        }
    },

    plugins: [
        new BomPlugin(true)   //gia unicode
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                eaLib: {
                    test: /[\\/]_libs\\ea\\ea.js/, 
                    name: 'ea',
                    chunks: 'all'
                },
                commons: {
                    test: /[\\/]_libs\\(jquery|jquery-ui|knockout)[\\/]/,  
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
}