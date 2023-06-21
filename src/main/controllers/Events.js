import {app,dialog,ipcMain,Menu} from 'electron';

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
        switch(command){
            case 'state':
                this._mainWindow.send('state',{
                    ui:{
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
            case 'openFile':{
                (async()=>{
                    const filePath=app.getPath('home'),
                        args=await dialog.showOpenDialog(this._mainWindow,{
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
            }
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

                this._mainWindow.send('state',{
                    ui:{
                        fullScreen:this._controller.getFullScreen()
                    }
                });
                this._mainWindow.setFullScreen(
                    this._controller.getFullScreen()
                );

                break;
            case 'singlePage':
                // TODO: console.log('Single Page');

                break;
            case 'doublePage':
                // TODO: console.log('Double Page');

                break;
            case 'comicMode':
                // TODO: console.log('Comic Mode');

                break;
            case 'mangaMode':
                // TODO: console.log('Manga Mode');

                break;
            case 'fitBest':
                // TODO: console.log('Fit Best Mode');

                break;
            case 'fitWidth':
                // TODO: console.log('Fit Width Mode');

                break;
            case 'fitHeight':
                // TODO: console.log('Fit Height Mode');

                break;
            case 'rotationCW':
                // TODO: console.log('Rotate 90 Degrees CW');

                break;
            case 'rotationCCW':
                // TODO: console.log('Rotate 90 Degrees CCW');

                break;
            case 'firstPage':
                (async()=>{
                    const viewer=this._controller.firstPage();

                    console.log('-->',viewer);
                })();

                break;
            case 'previousPage':
                (async()=>{
                    const viewer=this._controller.previousPage();

                    console.log('-->',viewer);
                })();

                break;
            case 'nextPage':
                (async()=>{
                    const viewer=this._controller.nextPage();

                    console.log('-->',viewer);
                })();

                break;
            case 'lastPage':
                (async()=>{
                    const viewer=this._controller.lastPage();

                    console.log('-->',viewer);
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

            const viewer=this._controller.firstPage();

            console.log('-->',viewer);

            this._mainWindow.send('state',{
                data:{
                    filePath:filePath
                }
            });
        }catch(error){
            console.log(error);

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
            data:{}
        });
    }
}

export default Events;

