var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry:   {app: './src/htmlv3/app.js', "vendor": ['react', 'react-dom']},
    output:  {
        filename: '[name].bundle.js',
        path:     path.resolve(__dirname, "build/htmlv3")
    },
    module:  {
        rules: [
            {
                test: /\.css$/,
                use:  ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use:      "css-loader"
                })
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name:"./fonts/[hash].ext"
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
    ]

}