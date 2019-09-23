import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Button,Divider,Form,Header,Icon,Input} from 'semantic-ui-react';

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
            <div id='settings' className='ui container'>
                <br />
                <Header as='h2' icon textAlign='center'>
                    <Icon name='settings' />
                    Settings
                </Header>
                <Form size='mini' success>
                    <Divider />
                    <Header as='h3'>Collection Settings</Header>
                    <Form.Input label='Collection Path' />
                    <Divider />
                    <Header as='h3'>Reader Settings</Header>
                    <Form.Input label='RAR command' placeholder='rar' />
                    <Form.Input label='SORT command' placeholder='sort' />
                    <Divider />
                    <Link className='ui button secondary mini right floated' to='/'>Go Back</Link>
                </Form>
            </div>
        );
    }
}

export default Settings;

