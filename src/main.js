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
      , doublepage:{
            type:'boolean'
          , default:false
        }
      , mangamode:{
            type:'boolean'
          , default:false
        }
      , fitmode:{
            type:'string'
          , default:'best'
        }
      , rotation:{
            type:'number'
          , minimum:0
          , maximum:270
          , default:0
        }
    })
  , env=(process.env.WEBPACK_DEV_SERVER=='true')?'development':'production'
  , book=new Book(env);

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

    let indexPath
      , param_path;

    if(env=='development'){
        indexPath=url.format({
            protocol:'http'
          , host:'localhost:2999'
          , pathname:'index.html'
          , slashes:true
        });
    }else{
        if(process.argv.indexOf('--noDevServer')!=1){
            if(process.argv.length>1){
                param_path=process.argv[1];
            }
        }

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

        if(env=='development'){
            mainWindow.webContents.openDevTools();
        }

        if(param_path||store.has('filepath')){
            let filepath
              , page;

            if(param_path){
                filepath=param_path;
                page=0;
            }else{
                filepath=store.get('filepath');
                page=store.get('page');
            }

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

