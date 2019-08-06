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

        console.log('PUBLIC URL',process.env);
        this.state={
            toolbar:true
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
        this.setState(data);
    }

    render(){
        let container_classes=['container'];

        if(this.state.pages.length==0||!this.state.toolbar){
            console.log('notoolbar');
            container_classes.push('notoolbar');
        }

        if(this.state.pages.length==0||!this.state.statusbar){
            container_classes.push('nostatusbar');
        }

        return (
            <div id="wrapper">
                {this.state.pages.length==0||!this.state.toolbar?null:<Toolbar />}
                <div className={container_classes.join(' ')}>
                    <img alt="" src={'/pages/a.jpg'} />
                    <img alt="" src={'/pages/b.jpg'} />
                </div>
                {this.state.pages.length==0||!this.state.statusbar?null:<Statusbar />}
            </div>
        );
    }
}

export default App;

