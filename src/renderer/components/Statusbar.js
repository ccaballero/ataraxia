// jshint ignore: start

import React from 'react';

class Statusbar extends React.Component {
    constructor(props){
        super(props);
    }

    info_pages(){
        return this.props.value.pages.filter((i)=>{
            return i.hash;
        })
        .map((j)=>{
            return j.id+1;
        }).join(', ')+' / '+this.props.value.total;
    };

    info_resolutions(){
        return this.props.value.pages.filter((i)=>{
            return i.hash;
        })
        .map((j)=>{
            return j.width+'x'+j.height;
        }).join(' | ');
    };

    render(){
        return (
            <div className="footer">
                <div className="column">{this.info_pages()}</div>
                <div className="column">{this.info_resolutions()}</div>
                <div className="column">{this.props.value.filepath}</div>
            </div>
        );
    }
}

export default Statusbar;

