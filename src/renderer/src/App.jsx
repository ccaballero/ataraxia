import React,{Component,Fragment} from 'react';
import MenuBar from './components/MenuBar.jsx';
import Reader from './components/Reader.jsx';
import StatusBar from './components/StatusBar.jsx';
import Merge from './utils/Merge.js';
import './App.css';

const ipcRenderer=window.electron.ipcRenderer;

class App extends Component {
    constructor(props){
        super(props);

        this.state={
            data:{
                /*filePath:'',
                pages:[{
                    index:0
                }],
                viewport:[{
                    width:100,
                    height:100
                }],
                total:0*/
            },
            ui:{}
        };
    }

    componentDidMount(){
        ipcRenderer.on('state',this.handle.bind(this));

        ipcRenderer.send('state',{});
    }

    componentWillUnmount(){
        ipcRenderer.removeListener('state',this.handle.bind(this));
    }

    handle(event,data){
        this.setState(Merge.mergeDeep(this.state,data));
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
            <Fragment>
                {
                    this.state.ui.toolBar&&
                    <MenuBar
                        mode={this.state.ui.mode}
                        fitMode={this.state.ui.fitMode}
                        pageMode={this.state.ui.pageMode}
                        readMode={this.state.ui.readMode}
                        openedFile={!!this.state.data.filePath}
                        eventClick={this.eventClick}
                        className='block'
                    />
                }
                <Reader
                    mode={this.state.ui.mode}
                    toolBar={this.state.ui.toolBar}
                    statusBar={this.state.ui.statusBar}
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
            </Fragment>
        );
    }
}

export default App;

