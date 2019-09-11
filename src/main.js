const {app,BrowserWindow}=require('electron')
  , Store=require('electron-store')
  , path=require('path')
  , url=require('url')
  , Events=require('./main/Events')
  , Menu=require('./main/Menu')
  , Book=require('./main/models/Book')
  , Exists=require('./main/utils/Exists');

let mainWindow
  , event
  , store=new Store({
        filepath:{
            type:'string'
        }
      , page:{
            type:'number'
          , minimum:0
          , default:0
        }
      , toolbar:{
            type:'boolean'
          , default:true
        }
      , statusbar:{
            type:'boolean'
          , default:true
        }
      , fullscreen:{
            type:'boolean'
          , default:false
        }
      , rotation:{
            type:'number'
          , minimum:0
          , maximum:270
          , default:0
        }
      , fit:{
            type:'string'
          , default:'height'
        }
      , doublepage:{
            type:'boolean'
          , default:false
        }
      , mangamode:{
            type:'boolean'
          , default:false
        }
    })
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
          , host:'localhost:2999'
          , pathname:'index.html'
          , slashes:true
        });
    }else{
        indexPath=url.format({
            protocol:'file'
          , pathname:path.join(__dirname,'..','dist','index.html')
          , slashes:true
        });
    }

    event=new Events(app,mainWindow,store,book);

    Menu.load(app,event);
    mainWindow.loadURL(indexPath);

    mainWindow.once('ready-to-show',()=>{
        mainWindow.show();

        if(dev){
            mainWindow.webContents.openDevTools();
        }

        if(store.has('filepath')){
            let filepath=store.get('filepath')
              , page=store.get('page');

            console.log('open book: %s\npage: %s',filepath,page);

            Exists.exists({
                filepath:filepath
            })
            .then((args)=>{
                if(args.check){
                    return event.open(filepath)
                    .then(()=>{
                        if(store.has('fullscreen')){
                            mainWindow.setFullScreen(
                                store.get('fullscreen',false));
                        }

                        return event.goto(page);
                    });
                }else{
                    console.log('file not found');
                }
            });
        }
    });

    mainWindow.on('closed',()=>{
        mainWindow=null;
    });
}


app.on('ready',init);

app.on('window-all-closed',()=>{
    if(process.platform!=='darwin'){
        book.close()
        .then(()=>{
            app.quit();
        });
    }
});

app.on('activate',()=>{
    if(mainWindow===null){
        init();
    }
});

