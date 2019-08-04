// jshint ignore: start

import React from 'react';
import './App.css';

class Toolbar extends React.Component {
    render(){
        return (
            <div className="toolbar">
                <div className="ui menu floated left inverted">
                    <a className="item"><i aria-hidden="true" className="icon angle double left"></i></a>
                    <a className="item"><i aria-hidden="true" className="icon angle left"></i></a>
                    <a className="item"><i aria-hidden="true" className="icon angle right"></i></a>
                    <a className="item"><i aria-hidden="true" className="icon angle double right"></i></a>
                    <div className="divider"></div>
                    <a className="item"><i aria-hidden="true" className="icon expand arrows alternate"></i></a>
                    <a className="item"><i aria-hidden="true" className="icon redo"></i></a>
                    <a className="item"><i aria-hidden="true" className="icon undo"></i></a>
                </div>
                <div className="ui menu floated right inverted">
                    <a className="item"><i aria-hidden="true" className="icon arrows alternate"></i></a>
                    <a className="item"><i aria-hidden="true" className="icon arrows alternate horizontal"></i></a>
                    <a className="item"><i aria-hidden="true" className="icon arrows alternate vertical"></i></a>
                    <a className="item"><i aria-hidden="true" className="icon columns"></i></a>
                    <a className="item"><i aria-hidden="true" className="icon exchange"></i></a>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}

class Statusbar extends React.Component {
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

class App extends React.Component {
    constructor(props){
        super(props);

        this.book='';

        this.toolbar=true;
        this.statusbar=true;

        this.fitmode='best';
        this.rotation=0;
        this.two_pages=true;

        this.current_page=0;
        this.total_pages=0;

        this.page1={
            src:''
          , count:0
          , width:0
          , height:0
        };
        this.page2={
            src:''
          , count:0
          , width:0
          , height:0
        };

        this.info_pages=()=>{
            if(this.two_pages){
                return this.page1.count+' , '+this.page2.count+
                    ' / '+this.total_pages;
            }else{
                return this.page1.count+
                    ' / '+this.total_pages;
            }
        };

        this.info_resolutions=()=>{
            if(this.two_pages){
                return this.page1.width+'x'+this.page1.height+'  '+
                    this.page2.width+'x'+this.page2.height;
            }else{
                return this.page1.width+'x'+this.page1.height;
            }
        };
    }

    render(){
        let container_classes=['container'];

        if(!this.book||!this.toolbar){
            container_classes.push('notoolbar');
        }

        if(!this.book||!this.statusbar){
            container_classes.push('nostatusbar');
        }

        return (
            <div id="wrapper">
                {!this.book||!this.toolbar?null:<Toolbar />}
                <div className={container_classes.join(' ')}>
                    <img alt="" src={process.env.PUBLIC_URL+this.page1.src} />
                    <img alt="" src={process.env.PUBLIC_URL+this.page2.src} />
                </div>
                {!this.book||!this.statusbar?null:<Statusbar />}
            </div>
        );
    }
}

export default App;

