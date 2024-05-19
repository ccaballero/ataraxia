import {unlink} from 'fs/promises';
import {resolve} from 'path';
import Page from './Page.js';
import Exists from '../util/Exists.js';
import Extract from '../util/Extract.js';
import List from '../util/List.js';
import Resolution from '../util/Resolution.js';
import Sort from '../util/Sort.js';

class Book{
    constructor(store,cacheDir,pagesDir){
        this._store=store;
        this._cacheDir=cacheDir;
        this._pagesDir=pagesDir;
        this._filePath=null;
        this._current=-1;
        this._pages=[];
        this._dpages=[];
    }

    set filePath(filePath){
        this._filePath=filePath;
    }

    get filePath(){
        return this._filePath;
    }

    get pages(){
        return this._pages;
    }

    get dpages(){
        return this._dpages;
    }

    async load(){
        let args=await Exists.exists({
            filePath:this._filePath
        });

        args=await List.list({
            ...args,
            command:this._store.get('commands.rar')
        });

        args=await Sort.sort({
            ...args,
            command:this._store.get('commands.sort')
        });

        this._current=0;
        this._pages=args
        .list
        .map((item,i)=>{
            return new Page(i,item);
        });
    }

    async map(){
        for(let i=0;i<this._pages.length;i++){
            if(!this._pages[i].hash){
                let args=await Extract.extract({
                    command:this._store.get('commands.rar'),
                    config:{
                        cacheDir:this._cacheDir,
                        pagesDir:this._pagesDir
                    },
                    filePath:this._filePath,
                    item:this._pages[i].name
                });

                args=await Resolution.resolution(args);

                this._pages[i].hash=args.hash;
                this._pages[i].width=args.width;
                this._pages[i].height=args.height;
            }
        }
    }

    index(){
        this._dpages=[];

        for(let i=0;i<this._pages.length;i++){
            if(
                i!==0&&
                this._pages[i]&&
                this._pages[i].isVertical()&&
                this._pages[i+1]&&
                this._pages[i+1].isVertical()
            ){
                this._dpages.push([
                    this._pages[i],
                    this._pages[i+1]
                ]);

                i++;
            }else{
                this._dpages.push([
                    this._pages[i]
                ]);
            }
        }
    }

    async close(){
        for await(const page of this._pages){
            if('hash' in page){
                if(page.hash){
                    await unlink(resolve(this._pagesDir,page.hash));
                }
            }
        }

        this._filePath=null;
        this._current=-1;
        this._pages=[];
        this._dpages=[];
    }

    set current(current){
        this._current=current;
    }

    get current(){
        return this._current;
    }

    get total(){
        return this._pages.length;
    }
}

export default Book;

