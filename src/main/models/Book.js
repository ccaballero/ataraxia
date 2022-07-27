import {unlink} from 'fs/promises';
import {resolve} from 'path';
import Page from './Page.js';
import Exists from '../utils/Exists.js';
import Extract from '../utils/Extract.js';
import List from '../utils/List.js';
import Resolution from '../utils/Resolution.js';
import Sort from '../utils/Sort.js';

class Book{
    constructor(cacheDir,pagesDir){
        this._cacheDir=cacheDir;
        this._pagesDir=pagesDir;
        this._filepath=null;
        this._current=-1;
        this._pages=[];
        this._dpages=[];
    }

    set filepath(filepath){
        this._filepath=filepath;
    }

    get filepath(){
        return this._filepath;
    }

    get pages(){
        return this._pages;
    }

    get dpages(){
        return this._dpages;
    }

    async load(){
        let args=await Exists.exists({
            filepath:this._filepath
        });

        args=await List.list(args);
        args=await Sort.sort(args);

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
                    config:{
                        cacheDir:this._cacheDir,
                        pagesDir:this._pagesDir
                    },
                    filepath:this._filepath,
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
                await unlink(resolve(this._pagesDir,page.hash));
            }
        }

        this._filepath=null;
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

