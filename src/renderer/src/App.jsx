import React,{Component} from 'react';
import MenuBar from './components/MenuBar.jsx';
import Reader from './components/Reader.jsx';
import StatusBar from './components/StatusBar.jsx';
import Merge from './utils/Merge.js';
import './App.css';

const ipcRenderer=window.electron.ipcRenderer;

class App extends Component {
    constructor(props){
        super(props);

        this._isMounted=false;
        this.state={
            data:{},
            ui:{}
        };

        this.updateWindowDimensions=this.updateWindowDimensions.bind(this);
    }

    componentDidMount(){
        this._isMounted=true;

        this.updateWindowDimensions();
        window.addEventListener('resize',this.updateWindowDimensions);

        ipcRenderer.on('state',this.handle.bind(this));
        ipcRenderer.send('state',{});
    }

    componentWillUnmount(){
        this._isMounted=false;

        window.removeEventListener('resize',this.updateWindowDimensions);

        ipcRenderer.removeListener('state',this.handle.bind(this));
    }

    updateWindowDimensions(){
        if(this._isMounted){
            this.setState(Merge.mergeDeep(this.state,{
                data:{
                    viewport:{
                        width:this.container.clientWidth,
                        height:this.container.clientHeight
                    }
                }
            }));
        }
    }

    handle(event,data){
        if(this._isMounted){
            this.setState(Merge.mergeDeep(this.state,data));
        }
    }

    eventClick(event){
        switch(event.target.id){
            case 'firstPage':
            case 'previousPage':
            case 'nextPage':
            case 'lastPage':
            case 'fullScreen':
            case 'rotationCCW':
            case 'rotationCW':
                ipcRenderer.send(event.target.id,{});

                break;
            case 'fitBest':
            case 'fitWidth':
            case 'fitHeight':
                ipcRenderer.send('fitMode',{
                    mode:event.target.id
                });

                break;
            case 'doublePage':
                ipcRenderer.send('pageMode',{
                    mode:'singlePage'
                });

                break;
            case 'singlePage':
                ipcRenderer.send('pageMode',{
                    mode:'doublePage'
                });

                break;
            case 'mangaMode':
                ipcRenderer.send('readMode',{
                    mode:'comicMode'
                });

                break;
            case 'comicMode':
                ipcRenderer.send('readMode',{
                    mode:'mangaMode'
                });

                break;
        }
    }

    render(){
        return (
            <div
                className='container'
                ref={(container)=>this.container=container}
            >
                {
                    this.state.ui.toolBar&&
                    <MenuBar
                        mode={this.state.ui.mode}
                        fitMode={this.state.ui.fitMode}
                        pageMode={this.state.ui.pageMode}
                        readMode={this.state.ui.readMode}
                        openedFile={!!this.state.data.filePath}
                        eventClick={this.eventClick}
                    />
                }
                <Reader
                    mode={this.state.ui.mode}
                    toolBar={this.state.ui.toolBar}
                    statusBar={this.state.ui.statusBar}
                    pages={this.state.data.pages||[]}
                    viewport={this.state.data.viewport}
                    rotation={this.state.ui.rotation}
                    fitMode={this.state.ui.fitMode}
                />
                {
                    this.state.ui.statusBar&&
                    <StatusBar
                        mode={this.state.ui.mode}
                        pages={this.state.data.pages||[]}
                        viewport={this.state.data.viewport}
                        total={this.state.data.total}
                        rotation={this.state.ui.rotation}
                        filePath={this.state.data.filePath}
                    />
                }
            </div>
        );
    }
}

export default App;

