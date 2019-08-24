// jshint ignore: start

import React from 'react';
import { ipcRenderer } from 'electron';

import '../assets/css/App.css';

import Toolbar from '../components/Toolbar';
import Statusbar from '../components/Statusbar';

import {
    FIT_BEST
  , FIT_WIDTH
  , FIT_HEIGHT
  , ROTATE_CW
  , ROTATE_CCW
  , SET_STATE
} from '../../constants';

class App extends React.Component {
    constructor(props){
        super(props);

        this.state={
            filepath:''
          , toolbar:true
          , statusbar:true
          , fullscreen:false
          , doublepage:true
          , mangamode:false
          , fitmode:'best'
          , rotation:0
          , current:0
          , total:0
          , pages:[]
        };
    }

    componentDidMount(){
        ipcRenderer.on(SET_STATE,this.handleState.bind(this));
    }

    componentWillUnmount(){
        ipcRenderer.removeListener(SET_STATE,this.handleState.bind(this));
    }

    handleState(event,data){
        //console.log('=>',data);

        this.setState(data);
    }

    renderPage(index){
        if(this.state.pages[index-1]){
            let image='/pages/'+this.state.pages[index-1].hash;

            return (
                <div className='page'>
                    <img alt="" src={image} />
                </div>
            );
        }else{
            return;
        }

    }

    render(){
        let container_classes=['container']
          , hide_toolbar=this.state.pages.length==0||
                !this.state.toolbar||this.state.fullscreen
          , hide_statusbar=this.state.pages.length==0||
                !this.state.statusbar||this.state.fullscreen;

        if(hide_toolbar){
            container_classes.push('notoolbar');
        }

        if(hide_statusbar){
            container_classes.push('nostatusbar');
        }

        return (
            <div id="wrapper">
                {hide_toolbar?null:<Toolbar value={this.state} />}
                <div className={container_classes.join(' ')}>
                    {this.renderPage(1)}
                    {this.renderPage(2)}
                </div>
                {hide_statusbar?null:<Statusbar value={this.state} />}
            </div>
        );
    }
}

export default App;

