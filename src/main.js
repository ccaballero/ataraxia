const {app,BrowserWindow}=require('electron')
  , path=require('path')
  , url=require('url')
  , Events=require('./main/Events')
  , Menu=require('./main/Menu')
  , Book=require('./main/models/Book');

let mainWindow
  , event
  , book=new Book()
  , dev=false;


if(process.defaultApp||
    /[\\/]electron-prebuilt[\\/]/.test(process.execPath)||
    /[\\/]electron[\\/]/.test(process.execPath)){
    dev=true;
}

function init(){
    mainWindow=new BrowserWindow({
        width:1280
      , height:720
      , show:false
      , center:true
      , webPreferences:{
            nodeIntegration:true
        }
    });

    let indexPath;

    if(dev&&process.argv.indexOf('--noDevServer')===-1){
        indexPath=url.format({
            protocol:'http'
          , host:'localhost:3000'
          , pathname:'index.html'
          , slashes:true
        });
    }else{
        indexPath=url.format({
            protocol:'file'
          , pathname:path.join(__dirname,'dist','index.html')
          , slashes:true
        });
    }

    event=new Events(app,mainWindow,book);

    Menu.load(app,event);
    mainWindow.loadURL(indexPath);

    mainWindow.once('ready-to-show',()=>{
        mainWindow.show();

        if(dev){
            //mainWindow.webContents.openDevTools();
        }
    });

    mainWindow.on('closed',()=>{
        mainWindow=null;
    });
}


app.on('ready',init);

app.on('window-all-closed',()=>{
    if(process.platform!=='darwin'){
        app.quit();
    }
});

app.on('activate',()=>{
    if(mainWindow===null){
        init();
    }
});

