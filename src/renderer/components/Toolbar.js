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
                <div className="ui menu floated left inverted">
                    <button className="item"
                        onClick={this.handleFirst}><i aria-hidden="true"
                        className="icon angle double left"></i></button>
                    <button className="item"
                        onClick={this.handlePrevious}><i aria-hidden="true"
                        className="icon angle left"></i></button>
                    <button className="item"
                        onClick={this.handleNext}><i aria-hidden="true"
                        className="icon angle right"></i></button>
                    <button className="item"
                        onClick={this.handleLast}><i aria-hidden="true"
                        className="icon angle double right"></i></button>
                    <div className="divider"></div>
                    <button className="item"
                        onClick={this.handleFullscreen}><i aria-hidden="true"
                        className="icon expand arrows alternate"></i></button>
                    <button className="item"
                        onClick={this.handleRotateCW}><i aria-hidden="true"
                        className="icon redo"></i></button>
                    <button className="item"
                        onClick={this.handleRotateCCW}><i aria-hidden="true"
                        className="icon undo"></i></button>
                </div>
                <div className="ui menu floated right inverted">
                    <button className="item"
                        onClick={this.handleFitBest}><i aria-hidden="true"
                        className="icon arrows alternate"></i></button>
                    <button className="item"
                        onClick={this.handleFitWidth}><i aria-hidden="true"
                        className="icon arrows alternate horizontal"></i></button>
                    <button className="item" 
                        onClick={this.handleFitHeight}><i aria-hidden="true"
                        className="icon arrows alternate vertical"></i></button>
                    <button className="item"
                        onClick={this.handleDoublePage}><i aria-hidden="true"
                        className="icon columns"></i></button>
                    <button className="item"
                        onClick={this.handleMangaMode}><i aria-hidden="true"
                        className="icon exchange"></i></button>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
};

export default Toolbar;

