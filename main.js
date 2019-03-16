const {app,BrowserWindow}=require('electron')
  , path=require('path')
  , url=require('url')
  , isDev=require('electron-is-dev');

let window
  , create_window=()=>{
        window=new BrowserWindow({
            width:900
          , height:680
        });

        window.loadURL(isDev?'http://localhost:3000':`file://${path.join(__dirname, '../build/index.html')}`);
        window.on('closed',()=>{
            window=null
        });
    };

app.on('ready',create_window);

app.on('window-all-closed',()=>{
    if(process.platform!=='darwin'){
        app.quit();
    }
});

app.on('activate',()=>{
    if(window===null){
        create_window();
    }
});

