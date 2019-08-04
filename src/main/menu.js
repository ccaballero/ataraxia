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
                        console.log(filepaths);
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


