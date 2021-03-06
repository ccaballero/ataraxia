import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Statusbar extends Component {
    constructor(props){
        super(props);
    }

    info_pages(){
        if(this.props.value.pages.length){
            return this.props.value.pages.filter((i)=>{
                return i.hash;
            })
            .map((j)=>{
                return j.id+1;
            }).join(', ')+' / '+this.props.value.total;
        }
    }

    info_resolutions(){
        return (this.props.value.pages.length?
                '(∠ '+this.props.value.rotation+'°) | ':'')+
            this.props.value.pages.filter((i)=>{
                return i.hash;
            })
            .map((j,i)=>{
                const proportion=this.props.value.scale[i]*100/j.width;

                return j.width+'x'+j.height+' ('+
                    (Math.round(proportion*100)/100)+' %)';
            }).join(' | ');
    }

    render(){
        return (
            <div className='footer'>
                <div className='column'>
                    {this.info_pages()}
                </div>
                <div className='column'>{this.info_resolutions()}</div>
                <div className='column'>{this.props.value.filepath}</div>
            </div>
        );
    }
}

export default Statusbar;

