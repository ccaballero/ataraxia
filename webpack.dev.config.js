const path=require('path')
  , HtmlWebpackPlugin=require('html-webpack-plugin')
  , {spawn}=require('child_process');

const SRC_DIR=path.resolve(__dirname,'src')
  , OUTPUT_DIR=path.resolve(__dirname,'dist')
  , PUBLIC_DIR=path.resolve(__dirname,'public');

module.exports={
    mode:'development'
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
            test:/\.(jpe?g|png|gif)$/
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
        new HtmlWebpackPlugin({
            template:'public/index.html'
          , inject:'body'
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

