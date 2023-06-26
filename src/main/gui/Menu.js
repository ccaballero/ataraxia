import {
    Menu as MenuUI
} from 'electron';

/* Mnemonics:
    1 => first page
    2 => previous page
    3 => next page
    4 => last page

    7 => fit best
    8 => fit width
    9 => fit height

    F => fullScreen

    [ => rotate cw
    ] => rotate ccw

    E => single page
    R => double page
    T => comic mode
    Y => manga mode

    O => open file
    W => close file
    C => collection
    S => settings
    Q => quit

    V => toogle toolBar
    B => toogle statusBar
 */

class Menu{
    static load(event){
        MenuUI.setApplicationMenu(MenuUI.buildFromTemplate([{
            label:'File',
            submenu:[{
                label:'Open',
                accelerator:'O',
                click:()=>{
                    return event.handler('openFile');
                }
            },{
                label:'Close',
                accelerator:'W',
                enabled:false,
                click:()=>{
                    return event.handler('closeFile');
                }
            },{
                type:'separator'
            },{
                label:'Collection',
                accelerator:'C',
                enabled:true,
                click:()=>{
                    return event.handler('collection');
                }
            },{
                label:'Settings',
                accelerator:'S',
                enabled:true,
                click:()=>{
                    return event.handler('settings');
                }
            },{
                type:'separator'
            },{
                label:'Quit',
                accelerator:'Q',
                click:()=>{
                    return event.handler('quit');
                }
            }]
        },{
            label:'View',
            submenu:[{
                label:'ToolBar',
                accelerator:'V',
                click:()=>{
                    return event.handler('toolBar');
                }
            },{
                label:'StatusBar',
                accelerator:'B',
                click:()=>{
                    return event.handler('statusBar');
                }
            },{
                type:'separator'
            },{
                label:'FullScreen',
                accelerator:'F',
                click:()=>{
                    return event.handler('fullScreen');
                }
            },{
                label:'Single Page',
                accelerator:'E',
                enabled:false,
                type:'checkbox',
                checked:false,
                click:()=>{
                    return event.handler('singlePage');
                }
            },{
                label:'Double Page',
                accelerator:'R',
                enabled:false,
                type:'checkbox',
                checked:false,
                click:()=>{
                    return event.handler('doublePage');
                }
            },{
                label:'Comic Mode',
                accelerator:'T',
                enabled:false,
                type:'checkbox',
                click:()=>{
                    return event.handler('comicMode');
                }
            },{
                label:'Manga Mode',
                accelerator:'Y',
                enabled:false,
                type:'checkbox',
                click:()=>{
                    return event.handler('mangaMode');
                }
            },{
                type:'separator'
            },{
                label:'Fit Best Mode',
                accelerator:'7',
                enabled:false,
                type:'radio',
                click:()=>{
                    return event.handler('fitBest');
                }
            },{
                label:'Fit Width Mode',
                accelerator:'8',
                enabled:false,
                type:'radio',
                click:()=>{
                    return event.handler('fitWidth');
                }
            },{
                label:'Fit Height Mode',
                accelerator:'9',
                enabled:false,
                type:'radio',
                click:()=>{
                    return event.handler('fitHeight');
                }
            },{
                type:'separator'
            },{
                label:'Rotate 90 Degrees CW',
                accelerator:'[',
                enabled:false,
                click:()=>{
                    return event.handler('rotationCW');
                }
            },{
                label:'Rotate 90 Degrees CCW',
                accelerator:']',
                enabled:false,
                click:()=>{
                    return event.handler('rotationCCW');
                }
            }]
        },{
            label:'Navigation',
            submenu:[{
                label:'First Page',
                accelerator:'1',
                enabled:false,
                click:()=>{
                    return event.handler('firstPage');
                }
            },{
                label:'Previous Page',
                accelerator:'2',
                enabled:false,
                click:()=>{
                    return event.handler('previousPage');
                }
            },{
                label:'Next Page',
                accelerator:'3',
                enabled:false,
                click:()=>{
                    return event.handler('nextPage');
                }
            },{
                label:'Last Page',
                accelerator:'4',
                enabled:false,
                click:()=>{
                    return event.handler('lastPage');
                }
            }]
        }]));
    }
}

export default Menu;

