class Viewport{
    constructor(store){
        this._toolBar=store.get('toolBar');
        this._statusBar=store.get('statusBar');
        this._fullScreen=store.get('fullScreen');
        this._pageMode=store.get('pageMode');
        this._readMode=store.get('readMode');
        this._fitMode=store.get('fitMode');
        this._rotation=store.get('rotation');
    }

    set toolBar(toolBar){
        this._toolBar=toolBar;
    }

    get toolBar(){
        return this._toolBar;
    }

    set statusBar(statusBar){
        this._statusBar=statusBar;
    }

    get statusBar(){
        return this._statusBar;
    }

    set fullScreen(fullScreen){
        this._fullScreen=fullScreen;
    }

    get fullScreen(){
        return this._fullScreen;
    }

    // singleMode, doubleMode
    set pageMode(pageMode){
        this._pageMode=pageMode;
    }

    get pageMode(){
        return this._pageMode;
    }

    // comicMode, mangaMode
    set readMode(readMode){
        this._readMode=readMode;
    }

    get readMode(){
        return this._readMode;
    }

    // fitBest, fitWidth, fitHeight
    set fitMode(fitMode){
        this._fitMode=fitMode;
    }

    get fitMode(){
        return this._fitMode;
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

