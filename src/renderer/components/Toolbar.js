// jshint ignore: start

import React from 'react';
import { ipcRenderer } from 'electron';

import {
    FIRST_PAGE
  , PREVIOUS_PAGE
  , NEXT_PAGE
  , LAST_PAGE
  , FULLSCREEN
  , ROTATE_CW
  , ROTATE_CCW
  , FIT_BEST
  , FIT_WIDTH
  , FIT_HEIGHT
  , DOUBLE_PAGE
  , MANGA_MODE
} from '../../constants';

class Toolbar extends React.Component {
    constructor(props){
        super(props);
    }

    handleFirst(){      ipcRenderer.send(FIRST_PAGE,{}); }
    handlePrevious(){   ipcRenderer.send(PREVIOUS_PAGE,{}); }
    handleNext(){       ipcRenderer.send(NEXT_PAGE,{}); }
    handleLast(){       ipcRenderer.send(LAST_PAGE,{}); }
    handleFullscreen(){ ipcRenderer.send(FULLSCREEN,{}); }
    handleRotatecW(){   ipcRenderer.send(ROTATE_CW,{}); }
    handleRotateCCW(){  ipcRenderer.send(ROTATE_CCW,{}); }
    handleFitBest(){    ipcRenderer.send(FIT_BEST,{}); }
    handleFitWidth(){   ipcRenderer.send(FIT_WIDTH,{}); }
    handleFitHeight(){  ipcRenderer.send(FIT_HEIGHT,{}); }
    handleDoublePage(){ ipcRenderer.send(DOUBLE_PAGE,{}); }
    handleMangaMode(){  ipcRenderer.send(MANGA_MODE,{}); }

    render(){
        return (
            <div className="toolbar">
                <div className="ui menu inverted floated left mini">
                    <button className={"item"+
                        (this.props.value.filepath?"":" disabled")}
                        onClick={this.handleFirst}>
                        <i className="icon angle double left"></i>
                    </button>
                    <button className={"item"+
                        (this.props.value.filepath?"":" disabled")}
                        onClick={this.handlePrevious}>
                        <i className="icon angle left"></i>
                    </button>
                    <button className={"item"+
                        (this.props.value.filepath?"":" disabled")}
                        onClick={this.handleNext}>
                        <i className="icon angle right"></i>
                    </button>
                    <button className={"item"+
                        (this.props.value.filepath?"":" disabled")}
                        onClick={this.handleLast}>
                        <i className="icon angle double right"></i>
                    </button>
                </div>
                <div className="ui menu inverted floated right mini">
                    <button className={"item"}
                        onClick={this.handleFullscreen}>
                        <i className="icon expand arrows alternate"></i>
                    </button>
                    <button className={"item"+
                        (this.props.value.fitmode=="best"?" active":"")+
                        (this.props.value.filepath?"":" disabled")}
                        onClick={this.handleFitBest}>
                        <i className="icon arrows alternate"></i>
                    </button>
                    <button className={"item"+
                        (this.props.value.fitmode=="width"?" active":"")+
                        (this.props.value.filepath?"":" disabled")}
                        onClick={this.handleFitWidth}>
                        <i className="icon arrows alternate horizontal"></i>
                    </button>
                    <button className={"item"+
                        (this.props.value.fitmode=="height"?" active":"")+
                        (this.props.value.filepath?"":" disabled")}
                        onClick={this.handleFitHeight}>
                        <i className="icon arrows alternate vertical"></i>
                    </button>
                    <div className="divider"></div>
                    <button className={"item"+
                        (this.props.value.filepath?"":" disabled")}
                        onClick={this.handleRotateCW}>
                        <i className="icon redo"></i>
                    </button>
                    <button className={"item"+
                        (this.props.value.filepath?"":" disabled")}
                        onClick={this.handleRotateCCW}>
                        <i aria-hidden="true"
                        className="icon undo"></i>
                    </button>
                    <div className="divider"></div>
                    <button className={"item"+
                        (this.props.value.doublepage?" active":"")+
                        (this.props.value.filepath?"":" disabled")}
                        onClick={this.handleDoublePage}>
                        <i className="icon columns"></i>
                    </button>
                    <button className={"item"+
                        (this.props.value.mangamode?" active":"")+
                        (this.props.value.filepath?"":" disabled")}
                        onClick={this.handleMangaMode}>
                        <i className="icon exchange"></i>
                    </button>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
};

export default Toolbar;

