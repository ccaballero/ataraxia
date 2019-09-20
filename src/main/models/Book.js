const fs=require('fs')
  , path=require('path')
  , Exists=require('../utils/Exists')
  , Extract=require('../utils/Extract')
  , List=require('../utils/List')
  , Resolution=require('../utils/Resolution')
  , Sort=require('../utils/Sort');

class Book {
    constructor(env){
        if(!!Book.instance){
            return Book.instance;
        }

        Book.instance=this;

        if(env=='development'){
            Book.config_cache=
                path.join(__dirname,'..','..','..','public','cache');
            Book.config_pages=
                path.join(__dirname,'..','..','..','public','pages');
        }else{
            Book.config_cache=
                path.join(__dirname,'..','..','..','dist','cache');
            Book.config_pages=
                path.join(__dirname,'..','..','..','dist','pages');
        }

        return this;
    }

    load(filepath){
        return Promise.resolve({
            filepath:filepath
        })
        .then(Exists.exists)
        .then(List.list)
        .then(Sort.sort)
        .then((args)=>{
            this._filepath=args.filepath;
            this._current=0;
            this._pages=args.list.map((item,i)=>{
                return {
                    index:i
                  , name:item
                  , width:0
                  , height:0
                };
            });

            return Promise.resolve();
        });
    }

    close(){
        if(!this._pages){
            return Promise.resolve();
        }

        return new Promise((resolve,reject)=>{
            this._pages
            .filter((item)=>{
                return 'hash' in item;
            })
            .reduce((sum,item)=>{
                return sum.then(()=>{
                    return new Promise((resolve)=>{
                        fs.unlink(path.resolve(Book.config_pages,item.hash),
                            ()=>{
                            resolve();
                        });
                    });
                });
            },Promise.resolve())
            .then(()=>{
                delete this._filepath;
                delete this._pages;

                resolve();
            })
            .catch((error)=>{
                reject(error);
            });
        });
    }

    get filepath(){
        return this._filepath;
    }

    get total(){
        return this._pages.length;
    }

    get current(){
        return this._current;
    }

    set current(current){
        this._current=current;
    }

    pages(args){
        return args.pages.reduce((sum,item)=>{
            return sum.then(()=>{
                if(!('id' in item)){
                    return Promise.resolve(args);
                }

                if(item.id>=this._pages.length){
                    return Promise.resolve(args);
                }

                if(this._pages[item.id].hash){
                    item.hash=this._pages[item.id].hash;
                    item.width=this._pages[item.id].width;
                    item.height=this._pages[item.id].height;

                    return Promise.resolve(args);
                }else{
                    return Promise.resolve({
                        config:{
                            cache:Book.config_cache
                          , pages:Book.config_pages
                        }
                      , filepath:this._filepath
                      , item:this._pages[item.id].name
                    })
                    .then(Extract.extract)
                    .then(Resolution.resolution)
                    .then((args1)=>{
                        this._pages[item.id].hash=args1.hash;
                        this._pages[item.id].width=args1.width;
                        this._pages[item.id].height=args1.height;

                        item.hash=args1.hash;
                        item.width=args1.width;
                        item.height=args1.height;

                        return Promise.resolve(args);
                    })
                    .catch((error)=>{
                        console.log(error);

                        return Promise.resolve(args);
                    });
                }
            });
        },Promise.resolve());
    }
}

module.exports=Book;

