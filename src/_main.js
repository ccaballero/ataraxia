import Events from './main/Events';
import Menu from './main/Menu';
import Book from './main/models/Book';
import Store from './main/models/Store';
import Exists from './main/utils/Exists';

    events,
    book=new Book(env),
    store=new Store();

function init(){
    let indexPath,
        param_path;

    if(env==='development'){
        indexPath=format({
            protocol:'http',
            host:'localhost:2999',
            pathname:'index.html',
            slashes:true
        });
    }else{
        if(process.argv.indexOf('--noDevServer')!==1){
            if(process.argv.length>1){
                param_path=process.argv[1];
            }
        }

        indexPath=format({
            protocol:'file',
            pathname:join(resolve(),'..','dist','index.html'),
            slashes:true
        });
    }

    events=new Events(app,mainWindow,store,book);

    Menu.load(app,events);
    mainWindow.loadURL(indexPath);

    mainWindow.once('ready-to-show',()=>{
        mainWindow.show();

        if(env==='development'){
            mainWindow.webContents.openDevTools();
        }

        if(param_path||store.has('filepath')){
            let filepath,
                page;

            if(param_path){
                filepath=param_path;
                page=0;
            }else{
                filepath=store.get('filepath');
                page=store.get('page');
            }

            console.log('open book: %s\npage: %s',filepath,page);

            Exists.exists({
                filepath:filepath
            })
            .then((args)=>{
                if(args.check){
                    return events.open(filepath)
                    .then(()=>{
                        if(store.has('fullscreen')){
                            mainWindow.setFullScreen(
                                store.get('fullscreen',false));
                        }

                        return events.goto(page);
                    });
                }else{
                    console.log('file not found');
                }
            });
        }
    });

    mainWindow.on('closed',()=>{
        mainWindow=null;
    });
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

