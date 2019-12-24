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
            view:'reader'
          , history:this.props.history
        };
    }

    componentWillReceiveProps(){
        this.setState({
            history:this.props.history
        });
    }

    componentDidMount(){
        ipcRenderer.on(SETTINGS,this.handleSettings.bind(this));
    }

    componentWillUnmount(){
        ipcRenderer.removeListener(SETTINGS,this.handleSettings.bind(this));
    }

    handleSettings(){
        if(this.props.location.pathname=='/'){
            this.state.view='settings';
            this.state.history.push('/settings');
        }else{
            this.state.view='reader';
            this.state.history.push('/');
        }
    }

    render(){
        const {location}=this.props
          , currentKey=location.pathname.split('/')[1]||'/'
          , timeout={
                enter:400
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
                    <div className='slide'>
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

