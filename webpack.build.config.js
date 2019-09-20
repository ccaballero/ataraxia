const path=require('path')
  , webpack=require('webpack')
  , MinifyPlugin=require('babel-minify-webpack-plugin')
  , {CleanWebpackPlugin}=require('clean-webpack-plugin')
  , HtmlWebpackPlugin=require('html-webpack-plugin')
  , MakeDirWebpackPlugin=require('make-dir-webpack-plugin');
//  , MiniCssExtractPlugin=require('mini-css-extract-plugin');

const SRC_DIR=path.resolve(__dirname,'src')
  , OUTPUT_DIR=path.resolve(__dirname,'dist');

module.exports={
    mode:'production'
  , entry:SRC_DIR+'/renderer/index.js'
  , output:{
        path:OUTPUT_DIR
      , filename:'bundle.js'
    }
  , module:{
        rules:[{
            test:/\.css$/
          , use:[
                'style-loader'
              , 'css-loader'
            ]
        },{
            test:/\.jsx?$/
          , use:[{
                loader:'babel-loader'
            }]
          , include:[
                SRC_DIR
              , path.resolve(__dirname,'node_modules')
            ]
        },{
            test:/\.(jpe?g|svg|png)$/
          , use:[{
                loader:'file-loader?name=img/[name]__[hash:base64:5].[ext]'
            }]
        },{
            test:/\.(eot|svg|ttf|woff|woff2)$/
          , use:[{
                loader:'file-loader?name=font/[name]__[hash:base64:5].[ext]'
            }]
        }]
    }
  , target:'electron-renderer'
  , plugins:[
        new webpack.ProgressPlugin()
      , new CleanWebpackPlugin()
      , new HtmlWebpackPlugin({
            template:'public/index.html'
          , inject:'body'
        })
//      , new MiniCssExtractPlugin({
//            filename:'bundle.css'
//        })
      , new MinifyPlugin()
      , new MakeDirWebpackPlugin({
            dirs:[{
                path:'dist/cache'
            },{
                path:'dist/pages'
            }]
        })
    ]
  , stats:{
        colors:true
      , children:false
      , chunks:false
      , modules:false
    }
};

