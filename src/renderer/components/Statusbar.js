// jshint ignore: start

import React from 'react';

class Statusbar extends React.Component {
    constructor(props){
        super(props);
    }

    info_pages(){
        return '--';
        /*if(this.two_pages){
            return this.page1.count+' , '+this.page2.count+
                ' / '+this.total_pages;
        }else{
            return this.page1.count+
                ' / '+this.total_pages;
        }*/
    };

    info_resolutions(){
        return '--';
        /*if(this.two_pages){
            return this.page1.width+'x'+this.page1.height+'  '+
                this.page2.width+'x'+this.page2.height;
        }else{
            return this.page1.width+'x'+this.page1.height;
        }*/
    };

    render(){
        return (
            <div className="footer">
                <div className="column">{this.info_pages()}</div>
                <div className="column">{this.info_resolutions()}</div>
                <div className="column">{this.book}</div>
            </div>
        );
    }
}

export default Statusbar;

