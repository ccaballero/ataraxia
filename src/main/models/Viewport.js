class Viewport{
    constructor(store){
        this._toolbar=store.get('toolbar');
        this._statusbar=store.get('statusbar');
        this._fullscreen=store.get('fullscreen');
        this._doublepage=store.get('doublepage');
        this._mangamode=store.get('mangamode');
        this._fitmode=store.get('fitmode');
        this._rotation=store.get('rotation');
    }

    set toolbar(toolbar){
        this._toolbar=toolbar;
    }

    get toolbar(){
        return this._toolbar;
    }

    set statusbar(statusbar){
        this._statusbar=statusbar;
    }

    get statusbar(){
        return this._statusbar;
    }

    set fullscreen(fullscreen){
        this._fullscreen=fullscreen;
    }

    get fullscreen(){
        return this._fullscreen;
    }

    set doublepage(doublepage){
        this._doublepage=doublepage;
    }

    get doublepage(){
        return this._doublepage;
    }

    set mangamode(mangamode){
        this._mangamode=mangamode;
    }

    get mangamode(){
        return this._mangamode;
    }

    // best, width, height
    set fitmode(fitmode){
        this._fitmode=fitmode;
    }

    get fitmode(){
        return this._fitmode;
    }

    // [(0º), (90ª), (180ª), (270º)]
    set rotation(rotation){
        this._rotation=rotation;
    }

    get rotation(){
        return this._rotation;
    }
}

export default Viewport;

