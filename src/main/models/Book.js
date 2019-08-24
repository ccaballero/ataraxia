const fs=require('fs')
  , path=require('path')
  , exists=require('../utils/exists')
  , extract=require('../utils/extract')
  , list=require('../utils/list')
  , resolution=require('../utils/resolution')
  , sort=require('../utils/sort')
  , config=require('../../../config');

class Book {
    constructor(){
        if(!!Book.instance){
            return Book.instance;
        }

        Book.instance=this;

        return this;
    }

    load(filepath){
        return Promise.resolve({
            filepath:filepath
        })
        .then(exists)
        .then(list)
        .then(sort)
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
                        fs.unlink(path.resolve(config.pages,item.hash),()=>{
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
        //console.log('0 ==>',JSON.stringify(args,null,'\t'));
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
                        filepath:this._filepath
                      , item:this._pages[item.id].name
                    })
                    .then(extract)
                    .then(resolution)
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

