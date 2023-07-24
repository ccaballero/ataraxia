class Viewport{
    constructor(store){
        this._store=store;
    }

    set toolBar(toolBar){
        this._store.set('toolBar',toolBar);
    }

    get toolBar(){
        return this._store.get('toolBar');
    }

    set statusBar(statusBar){
        this._store.set('statusBar',statusBar);
    }

    get statusBar(){
        return this._store.get('statusBar');
    }

    set fullScreen(fullScreen){
        this._store.set('fullScreen',fullScreen);
    }

    get fullScreen(){
        return this._store.get('fullScreen');
    }

    // singleMode, doubleMode
    set pageMode(pageMode){
        this._store.set('pageMode',pageMode);
    }

    get pageMode(){
        return this._store.get('pageMode');
    }

    // comicMode, mangaMode
    set readMode(readMode){
        this._store.set('readMode',readMode);
    }

    get readMode(){
        return this._store.get('readMode');
    }

    // fitBest, fitWidth, fitHeight
    set fitMode(fitMode){
        this._store.set('fitMode',fitMode);
    }

    get fitMode(){
        return this._store.get('fitMode');
    }

    // [(0º), (90ª), (180ª), (270º)]
    set rotation(rotation){
        this._store.set('rotation',rotation);
    }

    get rotation(){
        return this._store.get('rotation');
    }
}

export default Viewport;

