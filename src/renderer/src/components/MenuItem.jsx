import React,{Component} from 'react';
import {ReactComponent as Sprite} from '../assets/sprite.svg';
import './MenuItem.css';

const types=[
    'firstPage',
    'previousPage',
    'nextPage',
    'lastPage',
    'fitBest',
    'fitWidth',
    'fitHeight',
    'fullScreen',
    'doublePage',
    'singlePage',
    'rotationCCW',
    'rotationCW',
    'mangaMode',
    'comicMode'
];

class MenuItem extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <button
                id={this.props.type}
                type='button'
                className={[
                    'menuitem',
                    `menuitem-${this.props.mode}`,
                    `menuitem-${this.props.mode}-${this.props.type}`,
                    this.props.selected?'selected':'',
                    this.props.disabled?'disabled':''
                ]
                .join(' ')
                .trim()
                }
                onClick={this.props.eventClick}
                disabled={this.props.disabled}
            >
                <Sprite
                    width='100%'
                    height='100%'
                    viewBox={[
                        16.933332*types.indexOf(this.props.type),
                        0,
                        16.933332,
                        16.933332
                    ].join(' ')}
                    onClick={e=>e.stopPropagation()}
                />
            </button>
        );
    }
}

export default MenuItem;

