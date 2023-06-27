import React,{Component} from 'react';
import MenuItem from './MenuItem.jsx';
import './MenuBar.css';

class MenuBar extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <header
                className={[
                    'menubar',
                    `menubar-${this.props.mode}`
                ]
                .join(' ')}
            >
                <div className='wrapper'>
                    <div className='left'>
                        <MenuItem
                            mode={this.props.mode}
                            type='firstPage'
                            eventClick={this.props.eventClick}
                            disabled={!this.props.openedFile}
                        />
                        <MenuItem
                            mode={this.props.mode}
                            type='previousPage'
                            eventClick={this.props.eventClick}
                            disabled={!this.props.openedFile}
                        />
                        <MenuItem
                            mode={this.props.mode}
                            type='nextPage'
                            eventClick={this.props.eventClick}
                            disabled={!this.props.openedFile}
                        />
                        <MenuItem
                            mode={this.props.mode}
                            type='lastPage'
                            eventClick={this.props.eventClick}
                            disabled={!this.props.openedFile}
                        />
                    </div>
                    <div className='right'>
                        <MenuItem
                            selected={this.props.fitMode==='fitBest'}
                            mode={this.props.mode}
                            type='fitBest'
                            eventClick={this.props.eventClick}
                            disabled={!this.props.openedFile}
                        />
                        <MenuItem
                            selected={this.props.fitMode==='fitWidth'}
                            mode={this.props.mode}
                            type='fitWidth'
                            eventClick={this.props.eventClick}
                            disabled={!this.props.openedFile}
                        />
                        <MenuItem
                            selected={this.props.fitMode==='fitHeight'}
                            mode={this.props.mode}
                            type='fitHeight'
                            eventClick={this.props.eventClick}
                            disabled={!this.props.openedFile}
                        />

                        <MenuItem
                            mode={this.props.mode}
                            type='fullScreen'
                            eventClick={this.props.eventClick}
                        />
                        <MenuItem
                            mode={this.props.mode}
                            type='rotationCCW'
                            eventClick={this.props.eventClick}
                            disabled={!this.props.openedFile}
                        />
                        <MenuItem
                            mode={this.props.mode}
                            type='rotationCW'
                            eventClick={this.props.eventClick}
                            disabled={!this.props.openedFile}
                        />

                        <MenuItem
                            mode={this.props.mode}
                            type={
                                this.props.pageMode==='doublePage'?
                                    'doublePage':'singlePage'
                            }
                            eventClick={this.props.eventClick}
                            disabled={!this.props.openedFile}
                            selected
                        />

                        <MenuItem
                            mode={this.props.mode}
                            type={
                                this.props.readMode==='mangaMode'?
                                    'mangaMode':'comicMode'
                            }
                            eventClick={this.props.eventClick}
                            disabled={!this.props.openedFile}
                            selected
                        />
                    </div>
                </div>
            </header>
        );
    }
}

export default MenuBar;

