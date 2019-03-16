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

