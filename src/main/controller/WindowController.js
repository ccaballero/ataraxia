import {existsSync,mkdirSync} from 'node:fs';
import config from '../config/app.js';
import Book from '../model/Book.js';
import Viewport from '../model/Viewport.js';
import Store from '../store/Store.js';

class WindowController{
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

    set mode(mode){
        this._store.set('mode',mode);
    }

    get mode(){
        return this._store.get('mode');
    }

    set fitMode(fitMode){
        this._viewport.fitMode=fitMode;
    }

    get fitMode(){
        return this._viewport.fitMode;
    }

    set pageMode(pageMode){
        this._viewport.pageMode=pageMode;
    }

    get pageMode(){
        return this._viewport.pageMode;
    }

    set readMode(readMode){
        this._viewport.readMode=readMode;
    }

    get readMode(){
        return this._viewport.readMode;
    }

    toogleFullScreen(){
        this._viewport.fullScreen=!this._viewport.fullScreen;
    }

    get fullScreen(){
        return this._viewport.fullScreen;
    }

    set rotation(rotation){
        this._viewport.rotation=rotation;
    }

    get rotation(){
        return this._viewport.rotation;
    }

    toogleToolBar(){
        this._viewport.toolBar=!this._viewport.toolBar;
    }

    get toolBar(){
        return this._viewport.toolBar;
    }

    toogleStatusBar(){
        this._viewport.statusBar=!this._viewport.statusBar;
    }

    get statusBar(){
        return this._viewport.statusBar;
    }

    get book(){
        return this._book;
    }

    get store(){
        return this._store;
    }

    async openFile(filePath,page=0,menu){
        if(this._book.filePath){
            await this.closeFile(menu);
        }

        this._book.filePath=filePath;

        await this._book.load();
        await this._book.map();

        this._book.index();

        if(menu){
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
        }

        return {
            pages:this.goToPage(page),
            total:this.book.total,
        };
    }

    async closeFile(menu){
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

        if(menu){
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
        }
    }

    async quit(){
        await this._book.close();

        if(this._app){
            this._app.quit();
        }
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
            if(this.pageMode==='doublePage'){
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

                if(this.readMode==='mangaMode'){
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
        if(this.pageMode==='doublePage'){
            const dpage=this._book.dpages
            .find((_dpage)=>{
                return _dpage
                .find((page)=>{
                    return page.index===this._book.current;
                })!==undefined;
            });

            if(this.readMode==='mangaMode'){
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

            if(this.pageMode==='doublePage'){
                const dpage=this._book.dpages
                .find((_dpage)=>{
                    return _dpage
                    .find((page)=>{
                        return page.index===this._book.current;
                    })!==undefined;
                });

                if(this.readMode==='mangaMode'){
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
            if(this.pageMode==='doublePage'){
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

                if(this.readMode==='mangaMode'){
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

        if(this.pageMode==='doublePage'){
            const dpage=this._book.dpages
            .find((_dpage)=>{
                return _dpage
                .find((page)=>{
                    return page.index===this._book.current;
                })!==undefined;
            });

            if(this.readMode==='mangaMode'){
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

export default WindowController;

