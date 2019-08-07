const webpack=require('webpack')
  , path=require('path')
  , HtmlWebpackPlugin=require('html-webpack-plugin')
  , {spawn}=require('child_process');

const SRC_DIR=path.resolve(__dirname,'src')
  , OUTPUT_DIR=path.resolve(__dirname,'dist')
  , PUBLIC_DIR=path.resolve(__dirname,'public')
  , defaultInclude=[SRC_DIR];

module.exports={
    entry:SRC_DIR+'/renderer/index.js'
  , output:{
        path:OUTPUT_DIR
      , publicPath:'/'
      , filename:'bundle.js'
    }
  , module:{
        rules:[{
            test:/\.css$/
          , use:[{
                loader:'style-loader'
            },{
                loader:'css-loader'
            }]
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
        new HtmlWebpackPlugin({
            template:'public/index.html'
          , inject:'body'
        })
      , new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify('development')
        })
    ]
  , devtool:'cheap-source-map'
  , devServer:{
        contentBase:PUBLIC_DIR
      , stats:{
            colors:true
          , chunks:false
          , children:false
        }
      , before(){
            spawn('electron',['.'],{
                shell:true
              , env:process.env
              , stdio:'inherit'
            })
            .on('close',()=>process.exit(0))
            .on('error',spawnError=>console.error(spawnError));
        }
    }
};

