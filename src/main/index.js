import {app,shell,BrowserWindow} from 'electron';
import {join} from 'path';
import {electronApp,optimizer,is} from '@electron-toolkit/utils';
import App from './controllers/App.js';
import Events from './controllers/Events.js';
import Menu from './gui/Menu.js';
import icon from '../../resources/icon.png?asset';

const controller=new App(app,is);

function createWindow(){
    const mainWindow=new BrowserWindow({
            width:1366,
            height:768,
            show:false,
            center:true,
            autoHideMenuBar:true,
            ...(process.platform==='linux'?{icon}:{}),
            webPreferences:{
                preload:join(__dirname,'../preload/index.js'),
                sandbox:false
            }
        }),
        events=new Events(controller,mainWindow);

    mainWindow
    .on('ready-to-show',()=>{
        mainWindow.show();
    });

    mainWindow
    .webContents
    .setWindowOpenHandler((details)=>{
        shell.openExternal(details.url);

        return {
            action:'deny'
        };
    });

    Menu.load(events,controller.store);

    if(
        is.dev&&
        process.env['ELECTRON_RENDERER_URL']
    ){
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
    }else{
        mainWindow.loadFile(join(__dirname,'../renderer/index.html'));
    }
}

app
.whenReady()
.then(()=>{
    electronApp.setAppUserModelId('com.electron');

    app
    .on('browser-window-created',(_,window)=>{
        optimizer.watchWindowShortcuts(window);
    });

    createWindow();

    app
    .on('activate',function(){
        if(BrowserWindow.getAllWindows().length===0){
            createWindow();
        }
    });
});

app
.on('window-all-closed',async()=>{
    if(process.platform!=='darwin'){
        await controller.quit();
    }
});

