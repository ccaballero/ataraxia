import {ipcRenderer} from 'electron';
import React,{Component} from 'react';
import {Icon,Menu} from 'semantic-ui-react';

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

class Toolbar extends Component {
    constructor(props){
        super(props);
    }

    handleFirst(){      ipcRenderer.send(FIRST_PAGE,{}); }
    handlePrevious(){   ipcRenderer.send(PREVIOUS_PAGE,{}); }
    handleNext(){       ipcRenderer.send(NEXT_PAGE,{}); }
    handleLast(){       ipcRenderer.send(LAST_PAGE,{}); }
    handleFullscreen(){ ipcRenderer.send(FULLSCREEN,{}); }
    handleRotateCW(){   ipcRenderer.send(ROTATE_CW,{}); }
    handleRotateCCW(){  ipcRenderer.send(ROTATE_CCW,{}); }
    handleFitBest(){    ipcRenderer.send(FIT_BEST,{}); }
    handleFitWidth(){   ipcRenderer.send(FIT_WIDTH,{}); }
    handleFitHeight(){  ipcRenderer.send(FIT_HEIGHT,{}); }
    handleDoublePage(){ ipcRenderer.send(DOUBLE_PAGE,{}); }
    handleMangaMode(){  ipcRenderer.send(MANGA_MODE,{}); }

    render(){
        return (
            <div className='toolbar'>
                <Menu inverted compact floated size='mini' className='left'>
                    <Menu.Item
                        className={(this.props.value.filepath?'':'disabled')}
                        onClick={this.handleFirst}>
                        <Icon name='angle double left' />
                    </Menu.Item>
                    <Menu.Item
                        className={(this.props.value.filepath?'':'disabled')}
                        onClick={this.handlePrevious}>
                        <Icon name='angle left' />
                    </Menu.Item>
                    <Menu.Item
                        className={(this.props.value.filepath?'':'disabled')}
                        onClick={this.handleNext}>
                        <Icon name='angle right' />
                    </Menu.Item>
                    <Menu.Item
                        className={(this.props.value.filepath?'':'disabled')}
                        onClick={this.handleLast}>
                        <Icon name='angle double right' />
                    </Menu.Item>
                </Menu>
                <Menu inverted compact floated size='mini' className='right'>
                    <Menu.Item
                        className={(this.props.value.filepath?'':'disabled')}
                        onClick={this.handleFullscreen}>
                        <Icon name='expand arrows alternate' />
                    </Menu.Item>
                    <Menu.Item
                        className={
                            (this.props.value.filepath?'':'disabled')+
                            (this.props.value.filepath&&
                             this.props.value.fitmode=='best'?' active':'')
                        }
                        onClick={this.handleFitBest}>
                        <Icon name='arrows alternate' />
                    </Menu.Item>
                    <Menu.Item
                        className={
                            (this.props.value.filepath?'':'disabled')+
                            (this.props.value.filepath&&
                             this.props.value.fitmode=='width'?' active':'')
                        }
                        onClick={this.handleFitWidth}>
                        <Icon name='arrows alternate horizontal' />
                    </Menu.Item>
                    <Menu.Item
                        className={
                            (this.props.value.filepath?'':'disabled')+
                            (this.props.value.filepath&&
                             this.props.value.fitmode=='height'?' active':'')
                        }
                        onClick={this.handleFitHeight}>
                        <Icon name='arrows alternate vertical' />
                    </Menu.Item>

                    <Menu.Item
                        className={(this.props.value.filepath?'':'disabled')}
                        onClick={this.handleRotateCW}>
                        <Icon name='redo' />
                    </Menu.Item>
                    <Menu.Item
                        className={(this.props.value.filepath?'':'disabled')}
                        onClick={this.handleRotateCCW}>
                        <Icon name='undo' />
                    </Menu.Item>

                    <Menu.Item
                        className={
                            (this.props.value.filepath?'':'disabled')+
                            (this.props.value.filepath&&
                             this.props.value.doublepage?' active':'')
                        }
                        onClick={this.handleDoublePage}>
                        <Icon name='columns' />
                    </Menu.Item>
                    <Menu.Item
                        className={
                            (this.props.value.filepath?'':'disabled')+
                            (this.props.value.filepath&&
                             this.props.value.mangamode?' active':'')
                        }
                        onClick={this.handleMangaMode}>
                        <Icon name='exchange' />
                    </Menu.Item>
                </Menu>
                <div className='clearfix'></div>
            </div>
        );
    }
};

export default Toolbar;

