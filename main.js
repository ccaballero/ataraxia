const {app,BrowserWindow,Menu,dialog}=require('electron')
  , path=require('path')
  , isDev=require('electron-is-dev');

let window
  , create_window=()=>{
        Menu.setApplicationMenu(Menu.buildFromTemplate([{
            label:'File'
          , submenu:[{
                label:'Open'
              , accelerator:'CmdOrCtrl+O'
              , click:()=>{
                    dialog.showOpenDialog(null,{
                        title:'Open File'
                      , buttonLabel:'Open'
                      , filters:[{
                            name:'CBR File'
                          , extensions:['cbr']
                        }]
                      , properties:['openFile']
                    },(filepaths)=>{
                        console.log('FILES:',filepaths);
                    });
                }
            },{
                label:'Collection'
              , accelerator:'CmdOrCtrl+C'
            },{
                type:'separator'
            },{
                label:'Close'
              , accelerator:'CmdOrCtrl+W'
            },{
                label:'Quit'
              , accelerator:'CmdOrCtrl+Q'
              , click:()=>{
                    app.quit();
                }
            }]
        },{
            label:'View'
          , submenu:[{
                label:'Toolbar'
            },{
                label:'Statusbar'
            },{
                type:'separator'
            },{
                label:'Fullscreen'
              , accelerator:'F'
            },{
                label:'Double page'
              , accelerator:'D'
              , type:'checkbox'
            },{
                label:'Manga mode'
              , accelerator:'M'
              , type:'checkbox'
            },{
                type:'separator'
            },{
                label:'Best fit mode'
              , accelerator:'B'
              , type:'radio'
            },{
                label:'Fit width mode'
              , accelerator:'W'
              , type:'radio'
            },{
                label:'Fit height mode'
              , accelerator:'H'
              , type:'radio'
            },{
                type:'separator'
            },{
                label:'Rotate 90 degrees CW'
              , accelerator:'R'
            },{
                label:'Rotate 90 degrees CCW'
              , accelerator:'Shift+R'
            }]
        },{
            label:'Navigation'
          , submenu:[{
                label:'First page'
              , accelerator:'Home'
            },{
                label:'Previous page'
              , accelerator:'PageUp'
            },{
                label:'Next page'
              , accelerator:'PageDown'
            },{
                label:'Last page'
              , accelerator:'End'
            }]
        }]));

        window=new BrowserWindow({
            width:900
          , height:680
        });

        window.loadURL(isDev?
            'http://localhost:3000':
            `file://${path.join(__dirname, '../build/index.html')}`
        );
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

