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
        let fitbest=['item']
          , fitwidth=['item']
          , fitheight=['item']
          , doublepage=['item']
          , mangamode=['item'];

        switch(this.props.value.fitmode){
            case 'best':
                fitbest.push('active');
                break;
            case 'width':
                fitwidth.push('active');
                break;
            case 'height':
                fitheight.push('active');
                break;
        }

        if(this.props.value.doublepage){
            doublepage.push('active');
        }

        if(this.props.value.mangamode){
            mangamode.push('active');
        }

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
                    <button className={fitbest.join(' ')}
                        onClick={this.handleFitBest}><i aria-hidden="true"
                        className="icon arrows alternate"></i></button>
                    <button className={fitwidth.join(' ')}
                        onClick={this.handleFitWidth}><i aria-hidden="true"
                        className="icon arrows alternate horizontal"></i></button>
                    <button className={fitheight.join(' ')}
                        onClick={this.handleFitHeight}><i aria-hidden="true"
                        className="icon arrows alternate vertical"></i></button>
                    <button className={doublepage.join(' ')}
                        onClick={this.handleDoublePage}><i aria-hidden="true"
                        className="icon columns"></i></button>
                    <button className={mangamode.join(' ')}
                        onClick={this.handleMangaMode}><i aria-hidden="true"
                        className="icon exchange"></i></button>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
};

export default Toolbar;

