const {app,dialog,ipcMain,Menu}=require('electron')
  , dirname=require('path').dirname
  , {
        OPEN_FILE
      , CLOSE_FILE
      , QUIT
      , VIEW_TOOLBAR
      , VIEW_STATUSBAR
      , FULLSCREEN
      , DOUBLE_PAGE
      , MANGA_MODE
      , FIT_BEST
      , FIT_WIDTH
      , FIT_HEIGHT
      , ROTATE_CW
      , ROTATE_CCW
      , FIRST_PAGE
      , PREVIOUS_PAGE
      , NEXT_PAGE
      , LAST_PAGE
      , SET_STATE
    }=require('../constants');

class Events {
    constructor(app,mainWindow,store,book){
        this._app=app;
        this._mainWindow=mainWindow;
        this._book=book;
        this._store=store;

        this._toolbar=store.get('toolbar',true);
        this._statusbar=store.get('statusbar',true);
        this._fullscreen=store.get('fullscreen',false);
        this._doublepage=store.get('doublepage',false);
        this._mangamode=store.get('mangamode',false);
        this._fitmode=store.get('fitmode','best');

        ipcMain.on(FIRST_PAGE,()=>{
            return this.handle(FIRST_PAGE)();
        });

        ipcMain.on(PREVIOUS_PAGE,()=>{
            return this.handle(PREVIOUS_PAGE)();
        });

        ipcMain.on(NEXT_PAGE,()=>{
            return this.handle(NEXT_PAGE)();
        });

        ipcMain.on(LAST_PAGE,()=>{
            return this.handle(LAST_PAGE)();
        });

        ipcMain.on(FULLSCREEN,()=>{
            return this.handle(FULLSCREEN)();
        });

        ipcMain.on(ROTATE_CW,()=>{
            return this.handle(ROTATE_CW)();
        });

        ipcMain.on(ROTATE_CCW,()=>{
            return this.handle(ROTATE_CCW)();
        });

        ipcMain.on(FIT_BEST,()=>{
            return this.handle(FIT_BEST)();
        });

        ipcMain.on(FIT_WIDTH,()=>{
            return this.handle(FIT_WIDTH)();
        });

        ipcMain.on(FIT_HEIGHT,()=>{
            return this.handle(FIT_HEIGHT)();
        });

        ipcMain.on(DOUBLE_PAGE,()=>{
            return this.handle(DOUBLE_PAGE)();
        });

        ipcMain.on(MANGA_MODE,()=>{
            return this.handle(MANGA_MODE)();
        });
    }

    status(){
        return Promise.resolve({
            filepath:this._book.filepath
          , toolbar:this._toolbar
          , statusbar:this._statusbar
          , fullscreen:this._fullscreen
          , doublepage:this._doublepage
          , mangamode:this._mangamode
          , fitmode:this._fitmode
        });
    }

    open(filepath){
        return (()=>{
            if(this._book.filepath){
                return this._book.close();
            }else{
                return Promise.resolve();
            }
        })()
        .then(()=>{
            return this._book.load(filepath);
        })
        .then(()=>{
            var menu=Menu.getApplicationMenu();

            menu.items[0].submenu.items[1].enabled=true;
            menu.items[0].submenu.items[2].enabled=true;
            menu.items[0].submenu.items[3].enabled=true;
            menu.items[1].submenu.items[4].enabled=true;
            menu.items[1].submenu.items[5].enabled=true;
            menu.items[1].submenu.items[6].enabled=true;
            menu.items[1].submenu.items[7].enabled=true;
            menu.items[1].submenu.items[8].enabled=true;
            menu.items[1].submenu.items[8].enabled=true;
            menu.items[1].submenu.items[9].enabled=true;
            menu.items[2].submenu.items[0].enabled=true;
            menu.items[2].submenu.items[1].enabled=true;
            menu.items[2].submenu.items[2].enabled=true;
            menu.items[2].submenu.items[3].enabled=true;

            this._store.set('filepath',filepath);

            return this.goto(0);
        })
        .catch((error)=>{
            console.log(error);

            dialog.showMessageBox(this._mainWindow,{
                type:'error'
              , buttons:['OK']
              , title:'Error'
              , message:'The file could not be opened'
            });
        });
    }

    goto(current,direction=1){
        return this.status.bind(this)()
        .then((args)=>{
            this._book.current=current;
            this._last=current;

            args.pages=[{
                id:this._book.current
            }];

            if(args.doublepage){
                if(direction==1){
                    if(current<this._book.total-1){
                        this._last=current+1;
                        this._book.current=current;

                        args.pages.push({
                            id:current+1
                        });

                        if(args.mangamode){
                            args.pages.reverse();
                        }
                    }
                }

                if(direction==-1){
                    if(current>0){
                        this._last=current;
                        this._book.current=current-1;

                        args.pages.unshift({
                            id:current-1
                        });

                        if(args.mangamode){
                            args.pages.reverse();
                        }
                    }
                }
            }

            args.current=this._book.current;
            args.total=this._book.total;

            return this._book.pages(args);
        })
        .then((args)=>{
            this._store.set('page',this._book.current);
            this._mainWindow.send(SET_STATE,args);
        });
    }

    handle(command){
        return (()=>{
            switch(command){
                case OPEN_FILE:
                    let filepath=this._store.get('filepath');

                    if(filepath){
                        filepath=dirname(filepath);
                    }else{
                        filepath=app.getPath('home');
                    }

                    dialog.showOpenDialog(this._mainWindow,{
                        title:'Open File'
                      , defaultPath:filepath
                      , buttonLabel:'Open'
                      , filters:[{
                            name:'CBR File'
                          , extensions:['cbr']
                        }]
                      , properties:['openFile']
                    },(filepaths)=>{
                        if(filepaths.length==1){
                            return this.open(filepaths[0]);
                        }
                    });

                    break;
                case CLOSE_FILE:
                    this._book.close()
                    .then(this.status.bind(this))
                    .then((args)=>{
                        var menu=Menu.getApplicationMenu();

                        menu.items[0].submenu.items[1].enabled=false;
                        menu.items[0].submenu.items[2].enabled=false;
                        menu.items[0].submenu.items[3].enabled=false;
                        menu.items[1].submenu.items[4].enabled=false;
                        menu.items[1].submenu.items[5].enabled=false;
                        menu.items[1].submenu.items[6].enabled=false;
                        menu.items[1].submenu.items[7].enabled=false;
                        menu.items[1].submenu.items[8].enabled=false;
                        menu.items[1].submenu.items[8].enabled=false;
                        menu.items[1].submenu.items[9].enabled=false;
                        menu.items[2].submenu.items[0].enabled=false;
                        menu.items[2].submenu.items[1].enabled=false;
                        menu.items[2].submenu.items[2].enabled=false;
                        menu.items[2].submenu.items[3].enabled=false;

                        args.current=0;
                        args.total=0;
                        args.pages=[];

                        this._store.clear();
                        this._mainWindow.send(SET_STATE,args);
                    });

                    break;
                case QUIT:
                    this._book.close()
                    .then(()=>{
                        this._app.quit();
                    })
                    .catch(()=>{
                        this._app.quit();
                    });

                    break;
                case VIEW_TOOLBAR:
                    this._toolbar=!this._toolbar;

                    this.status.bind(this)()
                    .then((args)=>{
                        this._store.set('toolbar',this._toolbar);
                        this._mainWindow.send(SET_STATE,args);
                    });

                    break;
                case VIEW_STATUSBAR:
                    this._statusbar=!this._statusbar;

                    this.status.bind(this)()
                    .then((args)=>{
                        this._store.set('statusbar',this._statusbar);
                        this._mainWindow.send(SET_STATE,args);
                    });

                    break;
                case FULLSCREEN:
                    this._fullscreen=!this._fullscreen;
                    this._mainWindow.setFullScreen(this._fullscreen);

                    this.status.bind(this)()
                    .then((args)=>{
                        this._store.set('fullscreen',this._fullscreen);
                        this._mainWindow.send(SET_STATE,args);
                    });

                    break;
                case DOUBLE_PAGE:
                    this._doublepage=!this._doublepage;
                    this._store.set('doublepage',this._doublepage);
                    this.goto(this._book.current);

                    break;
                case MANGA_MODE:
                    this._mangamode=!this._mangamode;
                    this._store.set('mangamode',this._mangamode);
                    this.goto(this._book.current);

                    break;
                case FIT_BEST:
                    this._fitmode='best';

                    this.status.bind(this)()
                    .then((args)=>{
                        this._store.set('fitmode',this._fitmode);
                        this._mainWindow.send(SET_STATE,args);
                    });

                    break;
                case FIT_WIDTH:
                    this._fitmode='width';

                    this.status.bind(this)()
                    .then((args)=>{
                        this._store.set('fitmode',this._fitmode);
                        this._mainWindow.send(SET_STATE,args);
                    });

                    break;
                case FIT_HEIGHT:
                    this._fitmode='height';

                    this.status.bind(this)()
                    .then((args)=>{
                        this._store.set('fitmode',this._fitmode);
                        this._mainWindow.send(SET_STATE,args);
                    });

                    break;
                case ROTATE_CW:
//console.log('ROTATE CW:SEND =>',JSON.stringify({},null,'\t'));
                    this._mainWindow.send(ROTATE_CW,{});

                    break;
                case ROTATE_CCW:
//console.log('ROTATE CCW:SEND =>',JSON.stringify({},null,'\t'));
                    this._mainWindow.send(ROTATE_CCW,{});

                    break;
                case FIRST_PAGE:
                    if(this._book.filepath){
                        this.goto(0);
                    }

                    break;
                case PREVIOUS_PAGE:
                    if(this._book.filepath&&this._book.current>0){
                        this.goto(this._book.current-1,-1);
                    }

                    break;
                case NEXT_PAGE:
                    if(this._book.filepath&&this._last<this._book.total-1){
                        this.goto(this._last+1,1);
                    }

                    break;
                case LAST_PAGE:
                    if(this._book.filepath){
                        this.goto(this._book.total-1,-1);
                    }

                    break;
            }
        }).bind(this);
    }
}

module.exports=Events;

