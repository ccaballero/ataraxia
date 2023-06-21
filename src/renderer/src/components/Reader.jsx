import React,{Component} from 'react';
import './Reader.css';

class Reader extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <section
                className={[
                    'reader',
                    `reader-${this.props.mode}`,
                    `reader-${this.props.toolBar?'':'no-'}toolbar`,
                    `reader-${this.props.statusBar?'':'no-'}statusbar`
                ]
                .join(' ')}
            >
                <div className='wrapper'>
                </div>
            </section>
        );
    }
}

export default Reader;

