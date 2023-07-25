import React,{Component} from 'react';
import './StatusBar.css';

class StatusBar extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <footer
                className={[
                    'statusbar',
                    `statusbar-${this.props.mode}`
                ]
                .join(' ')}
            >
                <div className='wrapper'>
                    <div className='column'>
                        <span>
                            {this.props.pages
                            .map((v)=>{
                                return v.index+1;
                            })
                            .join(', ')}
                            {this.props.pages.length===0?'':' / '}
                            {this.props.total}
                        </span>
                    </div>
                    <div className='column'>
                        ∠ {this.props.rotation}°
                    </div>
                    <div className='column'>
                        {this.props.pages
                        .map((page,i)=>{
                            const viewport=this.props.viewport,
                                proportion=viewport.width*100/page.width;

                            return page.width+'×'+page.height+
                            ' ('+(Math.round(proportion*100)/100)+'%)';
                        })
                        .join(' | ')}
                        &nbsp;
                    </div>
                    <div className='column'>
                        {this.props.message||this.props.filePath}
                    </div>
                </div>
            </footer>
        );
    }
}

export default StatusBar;

