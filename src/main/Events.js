const {dialog,ipcMain}=require('electron')
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
    constructor(app,mainWindow,book){
        this._app=app;
        this._mainWindow=mainWindow;
        this._book=book;

        this._toolbar=true;
        this._statusbar=true;
        this._fullscreen=false;
        this._doublepage=true;
        this._mangamode=false;

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
            toolbar:this._toolbar
          , statusbar:this._statusbar
          , fullscreen:this._fullscreen
          , doublepage:this._doublepage
          , mangamode:this._mangamode
        });
    }

    handle(command){
        return (()=>{
            switch(command){
                case OPEN_FILE:
                    dialog.showOpenDialog(this._mainWindow,{
                        title:'Open File'
                      , buttonLabel:'Open'
                      , filters:[{
                            name:'CBR File'
                          , extensions:['cbr']
                        }]
                      , properties:['openFile']
                    },(filepaths)=>{
                        (()=>{
                            if(this._book.filepath){
                                return this._book.close();
                            }else{
                                return Promise.resolve();
                            }
                        })()
                        .then(()=>{
                            return this._book.load(filepaths[0]);
                        })
                        .then(this.status.bind(this))
                        .then((args)=>{
                            if(args.doublepage){
                                if(args.mangamode){
                                    args.pages=[{id:1},{id:0}];
                                }else{
                                    args.pages=[{id:0},{id:1}];
                                }
                            }else{
                                args.pages=[{id:0}];
                            }

                            args.current=this._book.current;
                            args.total=this._book.total;

                            return this._book.pages(args);
                        })
                        .then((args)=>{
console.log('OPEN FILE:SEND =>',JSON.stringify(args,null,'\t'));
                            this._mainWindow.send(SET_STATE,args);
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
                    });

                    break;
                case CLOSE_FILE:
                    this._book.close()
                    .then(this.status.bind(this))
                    .then((args)=>{
                        args.current=0;
                        args.total=0;
                        args.pages=[];

console.log('CLOSE FILE:SEND =>',JSON.stringify(args,null,'\t'));
                        this._mainWindow.send(SET_STATE,args);
                    });

                    break;
                case QUIT:
                    this._book.close()
                    .then(()=>{
                        this._app.quit();
                    });

                    break;
                case VIEW_TOOLBAR:
                    this.status.bind(this)()
                    .then((args)=>{
console.log('VIEW TOOLBAR:SEND =>',JSON.stringify(args,null,'\t'));
                        this._mainWindow.send(SET_STATE,args);
                    });

                    break;
                case VIEW_STATUSBAR:
                    this.status.bind(this)()
                    .then((args)=>{
console.log('VIEW STATUSBAR:SEND =>',JSON.stringify(args,null,'\t'));
                        this._mainWindow.send(SET_STATE,args);
                    });

                    break;
                case FULLSCREEN:
                    this._fullscreen=!this._fullscreen;
                    this._mainWindow.setFullScreen(this._fullscreen);

                    this.status.bind(this)()
                    .then((args)=>{
console.log('FULLSCREEN:SEND =>',JSON.stringify(args,null,'\t'));
                        this._mainWindow.send(SET_STATE,args);
                    });

                    break;
                case DOUBLE_PAGE:
                    this._doublepage=!this._doublepage;

                    this.status.bind(this)()
                    .then((args)=>{
console.log('DOUBLE PAGE:SEND =>',JSON.stringify(args,null,'\t'));
                        this._mainWindow.send(SET_STATE,args);
                    });

                    break;
                case MANGA_MODE:
                    this._mangamode=!this._mangamode;

                    this.status.bind(this)()
                    .then((args)=>{
console.log('MANGA MODE:SEND =>',JSON.stringify(args,null,'\t'));
                        this._mainWindow.send(SET_STATE,args);
                    });

                    break;
                case FIT_BEST:
console.log('FIT BEST:SEND =>',JSON.stringify({},null,'\t'));
                    this._mainWindow.send(FIT_BEST,{});

                    break;
                case FIT_WIDTH:
console.log('FIT WIDTH:SEND =>',JSON.stringify({},null,'\t'));
                    this._mainWindow.send(FIT_WIDTH,{});

                    break;
                case FIT_HEIGHT:
console.log('FIT HEIGHT:SEND =>',JSON.stringify({},null,'\t'));
                    this._mainWindow.send(FIT_HEIGHT,{});

                    break;
                case ROTATE_CW:
console.log('ROTATE CW:SEND =>',JSON.stringify({},null,'\t'));
                    this._mainWindow.send(ROTATE_CW,{});

                    break;
                case ROTATE_CCW:
console.log('ROTATE CCW:SEND =>',JSON.stringify({},null,'\t'));
                    this._mainWindow.send(ROTATE_CCW,{});

                    break;
                case FIRST_PAGE:
                    this.status.bind(this)()
                    .then((args)=>{
                        this._book.current=0;

                        args.current=this._book.current;
                        args.total=this._book.total;

                        if(args.doublepage){
                            if(args.mangamode){
                                args.pages=[{id:1},{id:0}];
                            }else{
                                args.pages=[{id:0},{id:1}];
                            }
                        }else{
                            args.pages=[{id:0}];
                        }

                        return this._book.pages(args);
                    })
                    .then((args)=>{
console.log('FIRST PAGE:SEND =>',JSON.stringify(args,null,'\t'));
                        this._mainWindow.send(SET_STATE,args);
                    });

                    break;
                case PREVIOUS_PAGE:
                    this.status.bind(this)()
                    .then((args)=>{
                        if(args.doublepage){
                            let skip=false;

                            if(this._book.current>1){
                                this._book.current=this._book.current-2;
                            }else if(this._book.current>0){
                                this._book.current=0;
                                skip=true;
                            }

                            if(args.mangamode){
                                args.pages=[{
                                    id:skip?
                                        this._book.current:this._book.current+1
                                },{
                                    id:skip?null:this._book.current
                                }];
                            }else{
                                args.pages=[{
                                    id:skip?null:this._book.current
                                },{
                                    id:skip?
                                        this._book.current:this._book.current+1
                                }];
                            }
                        }else{
                            if(this._book.current>0){
                                this._book.current--;
                            }

                            args.pages=[{id:this._book.current}];
                        }

                        args.current=this._book.current;
                        args.total=this._book.total;

                        return this._book.pages(args);
                    })
                    .then((args)=>{
console.log('PREVIOUS PAGE:SEND =>',JSON.stringify(args,null,'\t'));
                        this._mainWindow.send(SET_STATE,args);
                    });

                    break;
                case NEXT_PAGE:
                    this.status.bind(this)()
                    .then((args)=>{
                        if(args.doublepage){
                            let skip=false;

                            if(this._book.current<this._book.total-3){
                                this._book.current=this._book.current+2;
                            }else if(this._book.current<this._book.total-2){
                                this._book.current=this._book.total+1;
                                skip=true;
                            }

                            if(args.mangamode){
                                args.pages=[{
                                    id:skip?null:this._book.current+1
                                },{
                                    id:this._book.current
                                }];
                            }else{
                                args.pages=[{
                                    id:this._book.current
                                },{
                                    id:skip?null:this._book.current+1
                                }];
                            }
                        }else{
                            if(this._book.current<this._book.total-2){
                                this._book.current++;
                            }

                            args.pages=[{id:this._book.current}];
                        }

                        args.current=this._book.current;
                        args.total=this._book.total;

                        return this._book.pages(args);
                    })
                    .then((args)=>{
console.log('NEXT PAGE:SEND =>',JSON.stringify(args,null,'\t'));
                        this._mainWindow.send(SET_STATE,args);
                    });


                    break;
                case LAST_PAGE:
                    this.status.bind(this)()
                    .then((args)=>{
                        if(args.doublepage){
                            this._book.current=this._book.total-2;

                            if(args.mangamode){
                                args.pages=[{
                                    id:this._book.current
                                },{
                                    id:this._book.current-1
                                }];
                            }else{
                                args.pages=[{
                                    id:this._book.current-1
                                },{
                                    id:this._book.current
                                }];
                            }
                        }else{
                            this._book.current=this._book.total-1;

                            args.pages=[{
                                id:this._book.current
                            }];
                        }

                        args.current=this._book.current;
                        args.total=this._book.total;

                        return this._book.pages(args);
                    })
                    .then((args)=>{
console.log('LAST PAGE:SEND =>',JSON.stringify(args,null,'\t'));
                        this._mainWindow.send(SET_STATE,args);
                    });

                    break;
            }
        }).bind(this);
    }
}

module.exports=Events;

