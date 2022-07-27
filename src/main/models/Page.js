class Page{
    constructor(index,name){
        this._index=index;
        this._name=name;
    }

    set index(index){
        this._index=index;
    }

    get index(){
        return this._index;
    }

    set name(name){
        this._name=name;
    }

    get name(){
        return this._name;
    }

    set hash(hash){
        this._hash=hash;
    }

    get hash(){
        return this._hash;
    }

    set width(width){
        this._width=width;
    }

    get width(){
        return this._width;
    }

    set height(height){
        this._height=height;
    }

    get height(){
        return this._height;
    }

    isHorizontal(){
        return this._width>this._height;
    }

    isVertical(){
        return this._width<this._height;
    }

    toString(){
        return this.isHorizontal()?
            '('+this._index+')▬':
            '('+this._index+')▮';
    }
}

export default Page;

