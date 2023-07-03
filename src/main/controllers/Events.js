import {app,dialog,ipcMain,Menu} from 'electron';
import {is} from '@electron-toolkit/utils';
import {dirname} from 'path';

class Events{
    constructor(controller,mainWindow){
        this._controller=controller;
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
                        mode:this._controller.getMode(),
                        fitMode:this._controller.getFitMode(),
                        pageMode:this._controller.getPageMode(),
                        readMode:this._controller.getReadMode(),
                        fullScreen:this._controller.getFullScreen(),
                        rotation:this._controller.getRotation(),
                        toolBar:this._controller.getToolBar(),
                        statusBar:this._controller.getStatusBar()
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
                        return this.open(args.filePaths[0]);
                    }
                })();

                break;
            case 'closeFile':
                (async()=>{
                    return this.close();
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
                    if(this._controller.book.filepath){
                        await this.close();
                    }

                    const list=this._controller.store.get('recentFiles');

                    return this.open(list[param].filePath);
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
                        toolBar:this._controller.getToolBar()
                    }
                });

                break;
            case 'statusBar':
                this._controller.toogleStatusBar();

                this._mainWindow.send('state',{
                    ui:{
                        statusBar:this._controller.getStatusBar()
                    }
                });

                break;
            case 'fullScreen':
                this._controller.toogleFullScreen();

                this._mainWindow.setFullScreen(
                    this._controller.getFullScreen()
                );
                this._mainWindow.send('state',{
                    ui:{
                        fullScreen:this._controller.getFullScreen()
                    }
                });

                break;
            case 'singlePage':
            case 'doublePage':
                this._controller.setPageMode(command);

                this._mainWindow.send('state',{
                    data:{
                        pages:this._controller.currentPage()
                    },
                    ui:{
                        pageMode:this._controller.getPageMode()
                    }
                });

                break;
            case 'comicMode':
            case 'mangaMode':
                this._controller.setReadMode(command);

                this._mainWindow.send('state',{
                    data:{
                        pages:this._controller.currentPage()
                    },
                    ui:{
                        readMode:this._controller.getReadMode()
                    }
                });

                break;
            case 'fitBest':
            case 'fitWidth':
            case 'fitHeight':
                this._controller.setFitMode(command);

                this._mainWindow.send('state',{
                    ui:{
                        fitMode:this._controller.getFitMode()
                    }
                });

                break;
            case 'rotationCW':
                this._controller.setRotation(
                    (this._controller.getRotation()+90)%360
                );

                this._mainWindow.send('state',{
                    ui:{
                        rotation:this._controller.getRotation()
                    }
                });

                break;
            case 'rotationCCW':
                this._controller.setRotation(
                    (this._controller.getRotation()-90)%360
                );

                this._mainWindow.send('state',{
                    ui:{
                        rotation:this._controller.getRotation()
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

    async open(filePath){
        try{
            if(this._controller.book.filepath){
                await this._controller.closeFile();
            }

            await this._controller.openFile(filePath);

            let menu=Menu.getApplicationMenu();

            menu.items[0].submenu.items[1].enabled=true;
            menu.items[1].submenu.items[4].enabled=true;
            menu.items[1].submenu.items[5].enabled=true;
            menu.items[1].submenu.items[6].enabled=true;
            menu.items[1].submenu.items[7].enabled=true;
            menu.items[1].submenu.items[9].enabled=true;
            menu.items[1].submenu.items[10].enabled=true;
            menu.items[1].submenu.items[11].enabled=true;
            menu.items[1].submenu.items[13].enabled=true;
            menu.items[1].submenu.items[14].enabled=true;
            menu.items[2].submenu.items[0].enabled=true;
            menu.items[2].submenu.items[1].enabled=true;
            menu.items[2].submenu.items[2].enabled=true;
            menu.items[2].submenu.items[3].enabled=true;

            this._mainWindow.send('state',{
                data:{
                    pages:this._controller.firstPage(),
                    total:this._controller.book.total,
                    message:'',
                    filePath:filePath
                }
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

    async close(){
        await this._controller.closeFile();

        let menu=Menu.getApplicationMenu();

        menu.items[0].submenu.items[1].enabled=false;
        menu.items[1].submenu.items[4].enabled=false;
        menu.items[1].submenu.items[5].enabled=false;
        menu.items[1].submenu.items[6].enabled=false;
        menu.items[1].submenu.items[7].enabled=false;
        menu.items[1].submenu.items[9].enabled=false;
        menu.items[1].submenu.items[10].enabled=false;
        menu.items[1].submenu.items[11].enabled=false;
        menu.items[1].submenu.items[13].enabled=false;
        menu.items[1].submenu.items[14].enabled=false;
        menu.items[2].submenu.items[0].enabled=false;
        menu.items[2].submenu.items[1].enabled=false;
        menu.items[2].submenu.items[2].enabled=false;
        menu.items[2].submenu.items[3].enabled=false;

        this._mainWindow.send('state',{
            data:{
                pages:null,
                total:null,
                message:'Closed file',
                filePath:null
            }
        });
    }
}

export default Events;

