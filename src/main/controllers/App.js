import Book from '../models/Book.js';
import Viewport from '../models/Viewport.js';
import Store from '../store/Store.js';

class App{
    constructor(app,cacheDir,pagesDir){
        this._app=app;
        this._store=new Store();
        this._viewport=new Viewport(this._store);
        this._book=new Book(cacheDir,pagesDir);
    }

    toogleToolbar(){
        this._viewport.toolbar=!this._viewport.toolbar;
    }
    getToolbar(){
        return this._viewport.toolbar;
    }

    toogleStatusbar(statusbar){
        this._viewport.statusbar=!this._viewport.statusbar;
    }
    getStatusbar(){
        return this._viewport.statusbar;
    }

    toogleFullscreen(fullscreen){
        this._viewport.fullscreen=!this._viewport.fullscreen;
    }
    getFullscreen(){
        return this._viewport.fullscreen;
    }

    toogleDoublepage(doublepage){
        this._viewport.doublepage=!this._viewport.doublepage;
    }
    getDoublepage(){
        return this._viewport.doublepage;
    }

    toogleMangamode(mangamode){
        this._viewport.mangamode=!this._viewport.mangamode;
    }
    getMangamode(){
        return this._viewport.mangamode;
    }

    setFitmode(fitmode){
        this._viewport.fitmode=fitmode;
    }
    getFitmode(){
        return this._viewport.fitmode;
    }

    setRotation(rotation){
        this._viewport.rotation=rotation;
    }
    getRotation(){
        return this._viewport.rotation;
    }

    async openFile(filepath){
        this._book.filepath=filepath;

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

            if(this.getDoublepage()){
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

                if(this.getMangamode()){
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

            if(this.getDoublepage()){
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

                if(this.getMangamode()){
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

        if(this.getDoublepage()){
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

