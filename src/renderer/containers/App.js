// jshint ignore: start

import React,{Component,Fragment} from 'react';
import {ipcRenderer} from 'electron';

import '../assets/css/App.css';

import Toolbar from '../components/Toolbar';
import Statusbar from '../components/Statusbar';

import {
    SET_STATE
} from '../../constants';

class App extends Component {
    constructor(props){
        super(props);

        this.state={
            filepath:''
          , toolbar:true
          , statusbar:true
          , fullscreen:false
          , doublepage:true
          , mangamode:false
          , fitmode:'best'
          , rotation:0
          , current:0
          , total:0
          , pages:[]
          , width:0
          , height:0
          , scale:[0,0]
        };

        this.updateWindowDimensions=this.updateWindowDimensions.bind(this);
    }

    componentDidMount(){
        this.updateWindowDimensions();
        window.addEventListener('resize',this.updateWindowDimensions);

        ipcRenderer.on(SET_STATE,this.handleState.bind(this));
    }

    componentWillUnmount(){
        window.removeEventListener('resize',this.updateWindowDimensions);

        ipcRenderer.removeListener(SET_STATE,this.handleState.bind(this));
    }

    updateWindowDimensions(){
        this.setState({
            width:this.container.clientWidth
          , height:this.container.clientHeight
        });
    }

    handleState(event,data){
        this.setState(data);
    }

    renderToolbar(){
        if(this.state.toolbar&&!this.state.fullscreen){
            return (
                <Toolbar value={this.state} />
            );
        }
    }

    renderStatusbar(){
        if(this.state.statusbar&&!this.state.fullscreen){
            return (
                <Statusbar value={this.state} />
            );
        }
    }

    renderPage(index,width,height,sum,rotation){
        if(this.state.pages[index-1]){
            const image='pages/'+this.state.pages[index-1].hash
              , style1={
                    backgroundColor:'hsl('+(15+(index*50))+',100%,50%)'
                  , width:width
                  , height:height
                  , marginTop:this.state.height>height?
                        (this.state.height-height)/2:0
                  , marginLeft:(index==1&&this.state.width>sum)?
                        (this.state.width-sum)/2:0
                }
              , style2={
                    width:rotation%180==0?width:height
                  , height:rotation%180==0?height:width
                  , transform:'rotate('+this.state.rotation+'deg)'
                  , transformOrigin:'0px 0px'
                  , marginLeft:rotation==0?
                        0:rotation==90?width:rotation==180?width:0
                  , marginTop:rotation==0?
                        0:rotation==90?0:rotation==180?height:height
                };

            this.state.scale[index-1]=width;

            return (
                <div style={style1}>
                    <img src={image} style={style2} />
                </div>
            );
        }
    }

    render(){
        let x1=0,y1=0,x2=0,y2=0
          , X1=0,Y1=0,X2=0,Y2=0
          , w=this.state.width
          , h=this.state.height
          , rotation=this.state.rotation;

        switch(this.state.pages.length){
            case 1:
                switch(this.state.rotation){
                    case 0:
                    case 180:
                        x1=this.state.pages[0].width;
                        y1=this.state.pages[0].height;
                        x2=0;
                        y2=1;

                        break;
                    case 90:
                    case 270:
                        y1=this.state.pages[0].width;
                        x1=this.state.pages[0].height;
                        x2=0;
                        y2=1;

                        break;
                }

                break;
            case 2:
                switch(this.state.rotation){
                    case 0:
                    case 180:
                        x1=this.state.pages[0].width;
                        y1=this.state.pages[0].height;
                        x2=this.state.pages[1].width;
                        y2=this.state.pages[1].height;

                        break;
                    case 90:
                    case 270:
                        y1=this.state.pages[0].width;
                        x1=this.state.pages[0].height;
                        y2=this.state.pages[1].width;
                        x2=this.state.pages[1].height;

                        break;
                }

                break;
        }

        let y=Math.max(y1,y2)
          , fitmode=this.state.fitmode;

        if(fitmode=='best'){
            if(((x1+x2)*h)/y>w){
                fitmode='width';
            }else{
                fitmode='height';
            }
        }

        switch(fitmode){
            case 'width':
                X1=(w*x1*y2)/((x1*y2)+(x2*y1));
                Y1=(w*y1*y2)/((x1*y2)+(x2*y1));
                X2=(w*x2*y1)/((x1*y2)+(x2*y1));
                Y2=(w*y1*y2)/((x1*y2)+(x2*y1));

                break;
            case 'height':
                X1=(h*x1)/y1;
                Y1=h;
                X2=(h*x2)/y2;
                Y2=h;

                break;
        }

        return (
            <Fragment>
                {this.renderToolbar()}
                <div className='container'
                    ref={(container)=>this.container=container}>
                    {this.renderPage(1,X1,Y1,X1+X2,rotation)}
                    {this.renderPage(2,X2,Y2,X1+X2,rotation)}
                </div>
                {this.renderStatusbar()}
            </Fragment>
        );
    }
}

export default App;

