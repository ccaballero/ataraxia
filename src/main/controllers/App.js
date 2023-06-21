import Book from '../models/Book.js';
import Viewport from '../models/Viewport.js';
import Store from '../store/Store.js';

class App{
    constructor(app,config){
        this._app=app;
        this._store=new Store();
        this._viewport=new Viewport(this._store);
        this._config=config;
        this._book=new Book(config.cacheDir,config.pagesDir);
    }

    getMode(){
        return this._config.mode;
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
        this._book.filePath=filePath;

        await this._book.load();
        await this._book.map();
        
        this._book.index();
    }

    async closeFile(){
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

    firstPage(){
        this._book.current=0;

        return [
            this._book.pages[this._book.current]
        ];
    }

    previousPage(){
        if(this._book.current===0){
            throw new Error('previous_error');
        }else{
            this._book.current--;

            if(this.getPageMode()==='pageMode'){
                const dpage=this._book.dpages
                .find((_dpage)=>{
                    return _dpage
                    .find((page)=>{
                        return page.index===this._book.current;
                    })!==undefined;
                });

                if(dpage.length===2){
                    this._book.current--;
                }

                if(this.getMangaMode()){
                    return dpage.reverse();
                }else{
                    return dpage;
                }
            }else{
                return [
                    this._book.pages[this._book.current]
                ];
            }
        }
    }

    nextPage(){
        if(this._book.current<this._book.total-1){
            this._book.current++;

            if(this.getPageMode()==='pageMode'){
                const dpage=this._book.dpages
                .find((_dpage)=>{
                    return _dpage
                    .find((page)=>{
                        return page.index===this._book.current;
                    })!==undefined;
                });

                if(dpage.length===2){
                    this._book.current++;
                }

                if(this.getMangaMode()){
                    return dpage.reverse();
                }else{
                    return dpage;
                }
            }else{
                return [
                    this._book.pages[this._book.current]
                ];
            }
        }else{
            throw new Error('next_error');
        }
    }

    lastPage(){
        this._book.current=this._book.total-1;

        if(this.getPageMode()==='pageMode'){
            const dpage=this._book.dpages
            .find((_dpage)=>{
                return _dpage
                .find((page)=>{
                    return page.index===this._book.current;
                })!==undefined;
            });

            return dpage;
        }else{
            return [
                this._book.pages[this._book.current]
            ];
        }
    }
}

export default App;

