import {app,dialog,ipcMain,Menu} from 'electron';
import {is} from '@electron-toolkit/utils';
import {dirname} from 'path';

class EventController{
    constructor(windowController,mainWindow){
        this._controller=windowController;
        this._mainWindow=mainWindow;

        ipcMain.on('state',()=>{
            return this.handler('state');
        });

        ipcMain.on('firstPage',()=>{
            return this.handler('firstPage');
        });

        ipcMain.on('previousPage',()=>{
            return this.handler('previousPage');
        });

        ipcMain.on('nextPage',()=>{
            return this.handler('nextPage');
        });

        ipcMain.on('lastPage',()=>{
            return this.handler('lastPage');
        });

        ipcMain.on('fullScreen',()=>{
            return this.handler('fullScreen');
        });

        ipcMain.on('rotationCCW',()=>{
            return this.handler('rotationCCW');
        });

        ipcMain.on('rotationCW',()=>{
            return this.handler('rotationCW');
        });

        ipcMain.on('fitMode',(event,params)=>{
            return this.handler(params.mode);
        });

        ipcMain.on('pageMode',(event,params)=>{
            return this.handler(params.mode);
        });

        ipcMain.on('readMode',(event,params)=>{
            return this.handler(params.mode);
        });
    }

    handler(command){
        const [action,param]=command.split(':');

        switch(action){
            case 'state':
                this._mainWindow.send('state',{
                    ui:{
                        dev:is.dev,
                        mode:this._controller.mode,
                        fitMode:this._controller.fitMode,
                        pageMode:this._controller.pageMode,
                        readMode:this._controller.readMode,
                        fullScreen:this._controller.fullScreen,
                        rotation:this._controller.rotation,
                        toolBar:this._controller.toolBar,
                        statusBar:this._controller.statusBar
                    }
                });

                break;
            case 'openFile':
                (async()=>{
                    this._mainWindow.send('state',{
                        data:{
                            message:'Open a file selector ...'
                        }
                    });

                    let filePath=this._controller.book.filePath;

                    if(filePath){
                        filePath=dirname(filePath);
                    }else{
                        filePath=app.getPath('home');
                    }

                    const args=await dialog.showOpenDialog(this._mainWindow,{
                        title:'Open File',
                        defaultPath:filePath,
                        buttonLabel:'Open',
                        properties:['openFile']
                    });

                    if(
                        !args.canceled&&
                        args.filePaths.length===1
                    ){
                        try{
                            const data=await this._controller.openFile(
                                args.filePaths[0],
                                0,
                                Menu.getApplicationMenu()
                            );

                            this._mainWindow.send('state',{
                                ...data,
                                message:'',
                                filePath:filePath
                            });
                        }catch(error){
                            console.error(error);

                            dialog.showMessageBox(this._mainWindow,{
                                type:'error',
                                buttons:['OK'],
                                title:'Error',
                                message:'The file could not be opened'
                            });
                        }
                    }
                })();

                break;
            case 'closeFile':
                (async()=>{
                    await this._controller.closeFile(
                        Menu.getApplicationMenu()
                    );

                    this._mainWindow.send('state',{
                        data:{
                            pages:null,
                            total:null,
                            message:'Closed file',
                            filePath:null
                        }
                    });
                })();

                break;
            case 'restore':
                (async()=>{
                    this._mainWindow.send('state',{
                        data:{
                            message:'Restoring previous session ...'
                        }
                    });

                    if(
                        !is.dev&&
                        process.argv.length>1
                    ){
                        try{
                            const data=await this._controller.openFile(
                                process.argv[1],
                                0,
                                Menu.getApplicationMenu()
                            );

                            this._mainWindow.send('state',{
                                ...data,
                                message:'',
                                filePath:process.argv[1]
                            });
                        }catch(error){
                            console.error(error);

                            dialog.showMessageBox(this._mainWindow,{
                                type:'error',
                                buttons:['OK'],
                                title:'Error',
                                message:'The file could not be opened'
                            });
                        }
                    }else{
                        const list=this._controller.store.get('recentFiles',[]);

                        if(list.length!==0){
                            const item=list[list.length-1];

                            try{
                                const data=await this._controller.openFile(
                                    item.filePath,
                                    item.page,
                                    Menu.getApplicationMenu()
                                );

                                this._mainWindow.send('state',{
                                    ...data,
                                    message:'',
                                    filePath:item.filePath
                                });

                            }catch(error){
                                console.error(error);

                                dialog.showMessageBox(this._mainWindow,{
                                    type:'error',
                                    buttons:['OK'],
                                    title:'Error',
                                    message:'The file could not be opened'
                                });
                            }
                        }
                    }
                })();

                break;
            case 'collection':
                // TODO: console.log('Collection');

                break;
            case 'settings':
                // TODO: console.log('Settings');

                break;
            case 'recentFile':
                (async()=>{
                    const list=this._controller.store
                    .get('recentFiles',[])
                    .reverse();

                    return this._controller.openFile(
                        list[param].filePath,
                        list[param].page,
                        Menu.getApplicationMenu()
                    );
                })();

                break;
            case 'quit':
                (async()=>{
                    await this._controller.quit();
                })();

                break;
            case 'toolBar':
                this._controller.toogleToolBar();

                this._mainWindow.send('state',{
                    ui:{
                        toolBar:this._controller.toolBar
                    }
                });

                break;
            case 'statusBar':
                this._controller.toogleStatusBar();

                this._mainWindow.send('state',{
                    ui:{
                        statusBar:this._controller.statusBar
                    }
                });

                break;
            case 'fullScreen':
                this._controller.toogleFullScreen();

                this._mainWindow.send('state',{
                    ui:{
                        fullScreen:this._controller.fullScreen
                    }
                });

                this._mainWindow.setFullScreen(this._controller.fullScreen);

                break;
            case 'singlePage':
            case 'doublePage':
                this._controller.pageMode=command;

                this._mainWindow.send('state',{
                    data:{
                        pages:this._controller.currentPage()
                    },
                    ui:{
                        pageMode:this._controller.pageMode
                    }
                });

                break;
            case 'comicMode':
            case 'mangaMode':
                this._controller.readMode=command;

                this._mainWindow.send('state',{
                    data:{
                        pages:this._controller.currentPage()
                    },
                    ui:{
                        readMode:this._controller.readMode
                    }
                });

                break;
            case 'fitBest':
            case 'fitWidth':
            case 'fitHeight':
                this._controller.fitMode=command;

                this._mainWindow.send('state',{
                    ui:{
                        fitMode:this._controller.fitMode
                    }
                });

                break;
            case 'rotationCW':
                this._controller.rotation=(this._controller.rotation+90)%360;

                this._mainWindow.send('state',{
                    ui:{
                        rotation:this._controller.rotation
                    }
                });

                break;
            case 'rotationCCW':
                this._controller.rotation=(this._controller.rotation-90)%360;

                this._mainWindow.send('state',{
                    ui:{
                        rotation:this._controller.rotation
                    }
                });

                break;
            case 'firstPage':
                (async()=>{
                    this._mainWindow.send('state',{
                        data:{
                            pages:this._controller.firstPage()
                        }
                    });
                })();

                break;
            case 'previousPage':
                (async()=>{
                    try{
                        this._mainWindow.send('state',{
                            data:{
                                pages:this._controller.previousPage()
                            }
                        });
                    }catch(error){
                        console.error(error);
                    }
                })();

                break;
            case 'nextPage':
                (async()=>{
                    try{
                        this._mainWindow.send('state',{
                            data:{
                                pages:this._controller.nextPage()
                            }
                        });
                    }catch(error){
                        console.error(error);
                    }
                })();

                break;
            case 'lastPage':
                (async()=>{
                    this._mainWindow.send('state',{
                        data:{
                            pages:this._controller.lastPage()
                        }
                    });
                })();

                break;
        }
    }
}

export default EventController;

