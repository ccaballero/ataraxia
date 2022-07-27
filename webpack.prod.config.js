import {join,resolve} from 'path';
import webpack from 'webpack';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const SRC_DIR=join(resolve(),'src'),
    OUTPUT_DIR=join(resolve(),'dist');

export default {
    mode:'production',
    entry:SRC_DIR+'/renderer/index.js',
    output:{
        path:OUTPUT_DIR,
        filename:'bundle.js'
    },
    module:{
        rules:[{
            test:/\.jsx?$/,
            use:[{
                loader:'babel-loader'
            }],
            include:[
                SRC_DIR,
                join(resolve(),'node_modules')
            ]
        },{
            test:/\.css$/,
            use:[
                'style-loader',
                'css-loader'
            ]
        },{
            test:/\.(jpe?g|svg|png)$/,
            use:[{
                loader:'file-loader?name=img/[name]__[hash:base64:5].[ext]'
            }]
        },{
            test:/\.(eot|ttf|woff|woff2)$/,
            use:[{
                loader:'file-loader?name=font/[name]__[hash:base64:5].[ext]'
            }]
        }]
    },
    plugins:[
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:'public/index.html',
            inject:'body'
        }),
        new CopyPlugin({
            patterns:[{
                from:join(SRC_DIR,'..','public','cache'),
                to:join(OUTPUT_DIR,'cache')
            }]
        })
    ],
    target:'electron-renderer',
    stats:{
        colors:true,
        children:false,
        chunks:false,
        modules:false
    }
};

