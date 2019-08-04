const exists=require('../utils/exists')
  , extract=require('../utils/extract')
  , list=require('../utils/list')
  , resolution=require('../utils/resolution')
  , sort=require('../utils/sort');

class Book {
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

            return Promise.resolve(this);
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

    hash(index){
        if(this._pages.hash){
            return Promise.resolve(this._pages.hash);
        }else{
            return Promise.resolve({
                filepath:this._filepath
              , item:this._pages[index].name
            })
            .then(extract)
            .then(resolution)
            .then((args)=>{
                this._pages[index].hash=args.hash;
                this._pages[index].width=args.width;
                this._pages[index].height=args.height;

                return Promise.resolve(args.hash);
            });
        }
    }

    first(){
        this._current=0;

        return this.hash(0);
    }

    next(){
        if(this._current<this.total-1){
            this._current++;
        }

        return this.hash(this._current);
    }

    prev(){
        if(this._current>0){
            this._current--;
        }

        return this.hash(this._current);
    }

    last(){
        this._current=this.total-1;

        return this.hash(this._current);
    }
}

module.exports=Book;

