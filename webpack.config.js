const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: { 
        index: './src/index.js',
        about: './src/about/index.js',
        analytics: './src/analytics/index.js' 
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].[chunkhash].js'
    },
    module: {
        rules: [{ 
            test: /\.js$/, 
            use: { loader: "babel-loader" }, 
            exclude: /node_modules/ 
                },
                {
            test: /\.css$/i,
            use: [
                    (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                    {
                       loader: "css-loader",
                       options: { importLoaders: 1 },
                    },
                    'postcss-loader'
                 ]
            },
                {
            test: /\.(eot|ttf|woff|woff2)$/,
            use: {
                loader: "file-loader",
                options: {
                name: "./vendor/[name].[ext]",
                         }
                 }
                },
                {
            test: /\.(png|jpg|gif|ico|svg|jpeg)$/,
            use: [
                      {
                        loader: "file-loader",
                        options: {
                          name: "./images/[name].[ext]",
                          esModule: false,
                        },
                      },
                      {
                        loader: "image-webpack-loader",
                        options: {
                          esModule: false,
                          mozjepg: {
                            progressive: true,
                            quality: 65,
                          },
                          optipng: {
                            enabled: false,
                          },
                          pngquant: {
                            quality: [0.65, 0.9],
                            speed: 4,
                          },
                          gifsicle: {
                            interlaced: false,
                          },
                          webp: {
                            quality: 75,
                          }
                        }
                      }
                    ]
                  }
            ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
    }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/pages/index/index.html',
            chunks: ['index'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/pages/about/about.html',
            chunks: ['about'],
            filename: 'about.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/pages/analytics/analytics.html',
            chunks: ['analytics'],
            filename: 'analytics.html'
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
}
