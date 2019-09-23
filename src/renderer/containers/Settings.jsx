import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import '../assets/css/Settings.css';

class Settings extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    componentWillUnmount(){
    }

    render(){
        return (
            <div id='settings' className='ui container page'>
                <h2 className='ui center aligned icon header'>
                    <i className='circular cogs icon'></i>
                    Settings
                </h2>
                <div className='ui divider'></div>
                <form className='ui form'>
                    <div className='field'>
                        <div className='ui labeled input'>
                            <div className='ui label'>RAR command:</div>
                            <input type='text' placeholder='rar' />
                        </div>
                    </div>
                    <div className='field'>
                        <div className='ui labeled input'>
                            <div className='ui label'>SORT command:</div>
                            <input type='text' placeholder='sort' />
                        </div>
                    </div>
                    <button className='ui button primary left floated' type='submit'>Save</button>
                    <Link className='ui button right floated' to='/'>Cancel</Link>
                </form>
            </div>
        );
    }
}

export default Settings;

