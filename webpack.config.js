var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry:   {
        app: './src/htmlv3/app.js',
        "vendor": [
            'react',
            'react-dom'
        ]},
    output:  {
        filename: '[name].bundle.js',
        path:     path.resolve(__dirname, "build/htmlv3"),
        publicPath:"/"
    },
    module:  {
        rules: [
            {
                test: /\.css$/,
                use:  ExtractTextPlugin.extract({
                    allChunks:true,
                    fallback: "style-loader",
                    use:      "css-loader"
                })
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name:"css/fonts/[name].[hash].[ext]"
                }
            },
            {
                test: /\.(png|jpeg|jpg|gnf|ico)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name:"./images/[name].[hash].[ext]"
                }
            },
            {
                test:    /\.js(x)?$/,
                exclude: /node_modules/,
                loader:  'babel-loader',
                options: {
                    presets: [
                        'es2015',
                        'react',
                        'stage-0'
                    ]
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./css/bootstrap.dark.min.css'),
        new ExtractTextPlugin('./css/base.css'),
        new HtmlWebpackPlugin({title: 'Tree-Shaking', template: "./src/htmlv3/index.html"})
    ],
    devtool:"inline-source-map",
    stats:{// Add asset Information
        assets: true,
        // Sort assets by a field
        assetsSort: "field",
        // Add information about cached (not built) modules
        cached: false,
        // Add children information
        children: false,
        // Add chunk information (setting this to `false` allows for a less verbose output)
        // there is a bug where this is ignored 2017-3-21
        // https://github.com/webpack/webpack/issues/4230
        chunks: false,
        // Add built modules information to chunk information
        chunkModules: false,
        // Add the origins of chunks and chunk merging info
        chunkOrigins: false,
        // Sort the chunks by a field
        chunksSort: "field",
        // Context directory for request shortening
        //context: "./src/",
        // `webpack --colors` equivalent
        colors: true,
        // Add errors
        errors: true,
        // Add details to errors (like resolving log)
        errorDetails: true,
        // Add the hash of the compilation
        hash: true,
        // Add built modules information
        modules: false,
        // Sort the modules by a field
        modulesSort: "field",
        // Add public path information
        publicPath: false,
        // Add information about the reasons why modules are included
        reasons: false,
        // Add the source code of modules
        source: false,
        // Add timing information
        timings: true,
        // Add webpack version information
        version: true,
        // Add warnings
        warnings: true
    }

}