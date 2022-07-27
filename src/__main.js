import {join,resolve} from 'path';
import {format} from 'url';

    env=(process.env.WEBPACK_DEV_SERVER==='true')?'development':'production';

function init(){
    mainWindow=new BrowserWindow({
        width:1280,
        height:720,
        show:false,
        center:true,
        icon:join(resolve(),'..','public','icon.png'),
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false
        }
    });

    let indexPath;

    if(env==='development'){
        indexPath=format({
            protocol:'http',
            host:'localhost:2999',
            pathname:'index.html',
            slashes:true
        });
    }else{
        indexPath=format({
            protocol:'file',
            pathname:join(resolve(),'..','dist','index.html'),
            slashes:true
        });
    }
}

app.on('ready',init);
app.on('window-all-closed',()=>{
    if(process.platform!=='darwin'){
        book.close()
        .then(()=>{
            app.quit();
        });
    }
});
app.on('activate',()=>{
    if(mainWindow===null){
        init();
    }
});

