import React,{Component} from 'react';
import './Reader.css';

class Reader extends Component{
    constructor(props){
        super(props);
    }

    renderPage(index,width,height,sum,rotation){
        if(this.props.pages[index-1]){
            const image='pages/'+this.props.pages[index-1].hash,
                Width=this.props.viewport.width,
                Height=this.props.viewport.height,
                style1={
                    backgroundColor:'hsl('+(15+(index*50))+',100%,50%)',
                    width:width,
                    height:height,
                    marginTop:Height>height?(Height-height)/2:0,
                    marginLeft:(index===0&&Width>sum)?(Width-sum)/2:0,
                },
                style2={
                    width:rotation%180===0?width:height,
                    height:rotation%180===0?height:width,
                    transform:'rotate('+rotation+'deg)',
                    transformOrigin:'0px 0px',
                    marginLeft:rotation===0?
                        0:rotation===90?
                            width:rotation===180?
                                width:0,
                    marginTop:rotation===0?
                        0:rotation===90?
                            0:rotation===180?
                                height:height
                };

            return (
                <div style={style1}>
                    <img
                        style={style2}
                        src={image}
                    />
                </div>
            );
        }
    }

    render(){
        let x1=0,y1=0,x2=0,y2=0,
            X1=0,Y1=0,X2=0,Y2=0,
            w=this.props.viewport?this.props.viewport.width:0,
            h=this.props.viewport?this.props.viewport.height:0,
            rotation=this.props.rotation;

        switch(this.props.pages.length){
            case 0:
                return (
                    <section
                        className={[
                            'reader',
                            `reader-${this.props.mode}`,
                            `reader-${this.props.toolBar?'':'no-'}toolbar`,
                            `reader-${this.props.statusBar?'':'no-'}statusbar`,
                        ]
                        .join(' ')}
                    >
                        <div className='wrapper'>
                        </div>
                    </section>
                );
            case 1:
                switch(rotation){
                    case 0:
                    case 180:
                        x1=this.props.pages[0].width;
                        y1=this.props.pages[0].height;
                        x2=0;
                        y2=1;

                        break;
                    case 90:
                    case 270:
                        y1=this.props.pages[0].width;
                        x1=this.props.pages[0].height;
                        x2=0;
                        y2=1;

                        break;
                }

                break;
            case 2:
                switch(rotation){
                    case 0:
                    case 180:
                        x1=this.props.pages[0].width;
                        y1=this.props.pages[0].height;
                        x2=this.props.pages[1].width;
                        y2=this.props.pages[1].height;

                        break;
                    case 90:
                    case 270:
                        y1=this.props.pages[0].width;
                        x1=this.props.pages[0].height;
                        y2=this.props.pages[1].width;
                        x2=this.props.pages[1].height;

                        break;
                }

                break;
        }

        let y=Math.max(y1,y2),
            fitMode=this.props.fitMode;

        if(fitMode==='fitBest'){
            if(((x1+x2)*h)/y>w){
                fitMode='fitWidth';
            }else{
                fitMode='fitHeight';
            }
        }

        switch(fitMode){
            case 'fitWidth':
                X1=(w*x1*y2)/((x1*y2)+(x2*y1));
                Y1=(w*y1*y2)/((x1*y2)+(x2*y1));
                X2=(w*x2*y1)/((x1*y2)+(x2*y1));
                Y2=(w*y1*y2)/((x1*y2)+(x2*y1));

                break;
            case 'fitHeight':
                X1=(h*x1)/y1;
                Y1=h;
                X2=(h*x2)/y2;
                Y2=h;

                break;
        }

        return (
            <section
                className={[
                    'reader',
                    `reader-${this.props.mode}`,
                    `reader-${this.props.toolBar?'':'no-'}toolbar`,
                    `reader-${this.props.statusBar?'':'no-'}statusbar`,
                ]
                .join(' ')}
            >
                <div className='wrapper'>
                    {this.renderPage(1,X1,Y1,X1+X2,rotation)}
                    {this.renderPage(2,X2,Y2,X1+X2,rotation)}
                </div>
            </section>
        );
    }
}

export default Reader;

