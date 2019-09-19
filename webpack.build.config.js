const webpack=require('webpack')
  , path=require('path')
  , HtmlWebpackPlugin=require('html-webpack-plugin')
  , MinifyPlugin=require('babel-minify-webpack-plugin')
  , MiniCssExtractPlugin=require('mini-css-extract-plugin');

const SRC_DIR=path.resolve(__dirname,'src')
  , OUTPUT_DIR=path.resolve(__dirname,'dist')
  , defaultInclude=[SRC_DIR];

module.exports={
    entry:SRC_DIR+'/renderer/index.js'
  , output:{
        path:OUTPUT_DIR
      , publicPath:'./'
      , filename:'bundle.js'
    }
  , module:{
        rules:[{
            test:/\.css$/
          , use:[
                MiniCssExtractPlugin.loader
              , 'css-loader'
              , 'style-loader'
            ]
          , include:defaultInclude
        },{
            test:/\.jsx?$/
          , use:[{
                loader:'babel-loader'
            }]
          , include:defaultInclude
        },{
            test:/\.(jpe?g|png|gif)$/
          , use:[{
                loader:'file-loader?name=img/[name]__[hash:base64:5].[ext]'
            }]
          , include:defaultInclude
        },{
            test:/\.(eot|svg|ttf|woff|woff2)$/
          , use:[{
                loader:'file-loader?name=font/[name]__[hash:base64:5].[ext]'
            }]
          , include:defaultInclude
        }]
    }
  , target:'electron-renderer'
  , plugins:[
        new HtmlWebpackPlugin()
      , new MiniCssExtractPlugin({
            filename:'bundle.css'
        })
      , new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify('production')
        })
      , new MinifyPlugin()
  , ]
  , stats:{
        colors:true
      , children:false
      , chunks:false
      , modules:false
    }
};

