import {existsSync,mkdirSync} from 'node:fs';
import config from '../config/app.js';
import Book from '../models/Book.js';
import Viewport from '../models/Viewport.js';
import Store from '../store/Store.js';

class App{
    constructor(app,is){
        this._app=app;

        this._config=config();
        this._store=new Store();

        if(!this._store.get('commands.rar')){
            this._store.set('commands.rar',this._config.commands.rar);
        }

        if(!this._store.get('commands.sort')){
            this._store.set('commands.sort',this._config.commands.sort);
        }

        this._viewport=new Viewport(this._store);

        let cacheDir=this._config.cacheDir,
            pagesDir=this._config.pagesDir;

        if(!is.dev){
            cacheDir='/tmp/ataraxia-cache';
            pagesDir='/tmp/ataraxia-pages';

            if(!existsSync(cacheDir)){
                mkdirSync(cacheDir);
            }

            if(!existsSync(pagesDir)){
                mkdirSync(pagesDir);
            }
        }

        this._book=new Book(this._store,cacheDir,pagesDir);
    }

    get store(){
        return this._store;
    }

    setMode(mode){
        return this._store.set('mode',mode);
    }

    getMode(){
        return this._store.get('mode');
    }

    toogleToolBar(){
        this._viewport.toolBar=!this._viewport.toolBar;
    }

    getToolBar(){
        return this._viewport.toolBar;
    }

    toogleStatusBar(){
        this._viewport.statusBar=!this._viewport.statusBar;
    }

    getStatusBar(){
        return this._viewport.statusBar;
    }

    toogleFullScreen(){
        this._viewport.fullScreen=!this._viewport.fullScreen;
    }

    getFullScreen(){
        return this._viewport.fullScreen;
    }

    setPageMode(pageMode){
        this._viewport.pageMode=pageMode;
    }

    getPageMode(){
        return this._viewport.pageMode;
    }

    setReadMode(readMode){
        this._viewport.readMode=readMode;
    }

    getReadMode(){
        return this._viewport.readMode;
    }

    setFitMode(fitMode){
        this._viewport.fitMode=fitMode;
    }

    getFitMode(){
        return this._viewport.fitMode;
    }

    setRotation(rotation){
        this._viewport.rotation=rotation;
    }

    getRotation(){
        return this._viewport.rotation;
    }

    async openFile(filePath){
        if(this._book.filePath){
            await this.closeFile();
        }

        this._book.filePath=filePath;

        await this._book.load();
        await this._book.map();

        this._book.index();
    }

    async closeFile(){
        let list=this._store.get('recentFiles',[]);

        const index=list
        .findIndex((item)=>{
            return item.filePath===this._book.filePath;
        });

        if(index===-1){
            list.push({
                filePath:this._book.filePath,
                page:this._book.current
            });
        }else{
            list.splice(index,1);

            list.push({
                filePath:this._book.filePath,
                page:this._book.current
            });
        }

        this._store.set('recentFiles',list.slice(-5));

        await this._book.close();
    }

    async quit(){
        await this._book.close();

        if(this._app){
            this._app.quit();
        }
    }

    get book(){
        return this._book;
    }

    firstPage(json=true){
        this._book.current=0;

        return [
            json?
                this._book.pages[this._book.current].toJSON():
                this._book.pages[this._book.current]
        ];
    }

    previousPage(json=true){
        if(this._book.current===0){
            throw new Error('previous_error');
        }else{
            if(this.getPageMode()==='doublePage'){
                const dpage1=this._book.dpages
                .find((_dpage)=>{
                    return _dpage
                    .find((page)=>{
                        return page.index===this._book.current;
                    })!==undefined;
                });

                this._book.current-=dpage1.length;

                const dpage2=this._book.dpages
                .find((_dpage)=>{
                    return _dpage
                    .find((page)=>{
                        return page.index===this._book.current;
                    })!==undefined;
                });

                this._book.current=dpage2
                .reduce((sum,i)=>{
                    return Math.max(i.index,sum);
                },0);

                if(this.getReadMode()==='mangaMode'){
                    return dpage2
                    .toReversed()
                    .map((page)=>{
                        return json?
                            page.toJSON():
                            page;
                    });
                }else{
                    return dpage2
                    .map((page)=>{
                        return json?
                            page.toJSON():
                            page;
                    });
                }
            }else{
                this._book.current--;

                return [
                    json?
                        this._book.pages[this._book.current].toJSON():
                        this._book.pages[this._book.current]
                ];
            }
        }
    }

    currentPage(json=true){
        if(this.getPageMode()==='doublePage'){
            const dpage=this._book.dpages
            .find((_dpage)=>{
                return _dpage
                .find((page)=>{
                    return page.index===this._book.current;
                })!==undefined;
            });

            if(this.getReadMode()==='mangaMode'){
                return dpage
                .toReversed()
                .map((page)=>{
                    return json?
                        page.toJSON():
                        page;
                });
            }else{
                return dpage
                .map((page)=>{
                    return json?
                        page.toJSON():
                        page;
                });
            }
        }else{
            return [
                json?
                    this._book.pages[this._book.current].toJSON():
                    this._book.pages[this._book.current]
            ];
        }
    }

    goToPage(page=0,json=true){
        if(
            0<=page&&
            page<this._book.total
        ){
            this._book.current=page;

            if(this.getPageMode()==='doublePage'){
                const dpage=this._book.dpages
                .find((_dpage)=>{
                    return _dpage
                    .find((page)=>{
                        return page.index===this._book.current;
                    })!==undefined;
                });

                if(this.getReadMode()==='mangaMode'){
                    return dpage
                    .toReversed()
                    .map((page)=>{
                        return json?
                            page.toJSON():
                            page;
                    });
                }else{
                    return dpage
                    .map((page)=>{
                        return json?
                            page.toJSON():
                            page;
                    });
                }
            }else{
                return [
                    json?
                        this._book.pages[this._book.current].toJSON():
                        this._book.pages[this._book.current]
                ];
            }
        }
    }

    nextPage(json=true){
        if(this._book.current<this._book.total-1){
            if(this.getPageMode()==='doublePage'){
                this._book.current++;

                const dpage2=this._book.dpages
                .find((_dpage)=>{
                    return _dpage
                    .find((page)=>{
                        return page.index===this._book.current;
                    })!==undefined;
                });

                this._book.current=dpage2
                .reduce((sum,i)=>{
                    return Math.max(i.index,sum);
                },0);

                if(this.getReadMode()==='mangaMode'){
                    return dpage2
                    .toReversed()
                    .map((page)=>{
                        return json?
                            page.toJSON():
                            page;
                    });
                }else{
                    return dpage2
                    .map((page)=>{
                        return json?
                            page.toJSON():
                            page;
                    });
                }
            }else{
                this._book.current++;

                return [
                    json?
                        this._book.pages[this._book.current].toJSON():
                        this._book.pages[this._book.current]
                ];
            }
        }else{
            throw new Error('next_error');
        }
    }

    lastPage(json=true){
        this._book.current=this._book.total-1;

        if(this.getPageMode()==='doublePage'){
            const dpage=this._book.dpages
            .find((_dpage)=>{
                return _dpage
                .find((page)=>{
                    return page.index===this._book.current;
                })!==undefined;
            });

            if(this.getReadMode()==='mangaMode'){
                return dpage
                .toReversed()
                .map((page)=>{
                    return json?
                        page.toJSON():
                        page;
                });
            }else{
                return dpage
                .map((page)=>{
                    return json?
                        page.toJSON():
                        page;
                });
            }
        }else{
            return [
                json?
                    this._book.pages[this._book.current].toJSON():
                    this._book.pages[this._book.current]
            ];
        }
    }

    restoreSession(event,is){
        if(
            !is.dev&&
            process.argv.length>1
        ){
            event.openFile(process.argv[1],1);
        }else{
            const list=this._store.get('recentFiles',[]);

            if(list.length!==0){
                const item=list[list.length-1];

                event.openFile(item.filePath,item.page);
            }
        }
    }
}

export default App;

