import {ipcRenderer} from 'electron';
import React,{Component} from 'react';
import {Route,Switch,withRouter} from 'react-router-dom';
import {TransitionGroup,CSSTransition} from 'react-transition-group';

import '../assets/css/App.css';

import Reader from './Reader.jsx';
import Settings from './Settings.jsx';

import {
    SETTINGS
} from '../../constants';

class App extends Component {
    constructor(props){
        super(props);

        this.state={
            prevDepth:this.getPathDepth(this.props.location)
          , history:this.props.history
        };
    }

    componentWillReceiveProps(){
        this.setState({
            prevDepth:this.getPathDepth(this.props.location)
          , history:this.props.history
        });
    }

    componentDidMount(){
        ipcRenderer.on(SETTINGS,this.handleSettings.bind(this));
    }

    componentWillUnmount(){
        ipcRenderer.removeListener(SETTINGS,this.handleSettings.bind(this));
    }

    handleSettings(event,data){
        if(this.props.location.pathname=='/'){
            this.state.history.push('/settings');
        }
    }

    getPathDepth(location){
        return location.pathname
            .split('/')
            .filter((i)=>{return i!=='';})
            .length;
    }

    render(){
        const {location}=this.props
          , currentKey=location.pathname.split('/')[1]||'/'
          , timeout={
                enter:800
              , exit:400
            };

        return (
            <TransitionGroup component='div' id='app-content'>
                <CSSTransition
                    key={currentKey}
                    timeout={timeout}
                    classNames='pageSlider'
                    mountOnEnter={false}
                    unmountOnExit={true}>
                    <div className={
                        this.getPathDepth(location)-this.state.prevDepth>=0?
                        'left':'right'}>
                        <Switch location={location}>
                            <Route path='/' exact   component={Reader} />
                            <Route path='/settings' component={Settings} />
                        </Switch>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        );
    }
}

export default withRouter(App);

