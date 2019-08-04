const {app,BrowserWindow}=require('electron')
  , path=require('path')
  , isDev=require('electron-is-dev');

let main_window
  , create_window=()=>{
        main_window=new BrowserWindow({
            width:1900
          , height:680
        });

        main_window.loadURL(isDev?
            'http://localhost:3000':
            'file://'+path.join(__dirname,'../build/index.html')
        );

        main_window.webContents.openDevTools();

        main_window.on('closed',()=>{
            main_window=null;
        });
    };

app.on('ready',create_window);

app.on('window-all-closed',()=>{
    if(process.platform!=='darwin'){
        app.quit();
    }
});

app.on('activate',()=>{
    if(main_window===null){
        create_window();
    }
});

