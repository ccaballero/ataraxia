import {
    Menu as MenuUI
} from 'electron';

/* Mnemonics:
    H => first page
    J => previous page
    K => next page
    L => last page

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
    static load(eventController,store){
        let recentFiles=store
        .get('recentFiles',[])
        .reverse()
        .map((file,i)=>{
            return {
                label:file.filePath,
                enabled:true,
                click:()=>{
                    return eventController.handler('recentFile:'+i);
                }
            };
        });

        MenuUI.setApplicationMenu(MenuUI.buildFromTemplate([{
            label:'File',
            submenu:[{
                label:'Open',
                accelerator:'O',
                click:()=>{
                    return eventController.handler('openFile');
                }
            },{
                label:'Close',
                accelerator:'W',
                enabled:false,
                click:()=>{
                    return eventController.handler('closeFile');
                }
            },{
                type:'separator'
            },{
                label:'Collection',
                accelerator:'C',
                enabled:true,
                click:()=>{
                    return eventController.handler('collection');
                }
            },{
                label:'Settings',
                accelerator:'S',
                enabled:true,
                click:()=>{
                    return eventController.handler('settings');
                }
            },{
                type:'separator'
            },...recentFiles,{
                type:'separator'
            },{
                label:'Quit',
                accelerator:'Q',
                click:()=>{
                    return eventController.handler('quit');
                }
            }]
        },{
            label:'View',
            submenu:[{
                label:'ToolBar',
                accelerator:'V',
                click:()=>{
                    return eventController.handler('toolBar');
                }
            },{
                label:'StatusBar',
                accelerator:'B',
                click:()=>{
                    return eventController.handler('statusBar');
                }
            },{
                type:'separator'
            },{
                label:'FullScreen',
                accelerator:'F',
                click:()=>{
                    return eventController.handler('fullScreen');
                }
            },{
                label:'Single Page',
                accelerator:'E',
                enabled:false,
                type:'checkbox',
                checked:false,
                click:()=>{
                    return eventController.handler('singlePage');
                }
            },{
                label:'Double Page',
                accelerator:'R',
                enabled:false,
                type:'checkbox',
                checked:false,
                click:()=>{
                    return eventController.handler('doublePage');
                }
            },{
                label:'Comic Mode',
                accelerator:'T',
                enabled:false,
                type:'checkbox',
                click:()=>{
                    return eventController.handler('comicMode');
                }
            },{
                label:'Manga Mode',
                accelerator:'Y',
                enabled:false,
                type:'checkbox',
                click:()=>{
                    return eventController.handler('mangaMode');
                }
            },{
                type:'separator'
            },{
                label:'Fit Best Mode',
                accelerator:'7',
                enabled:false,
                type:'radio',
                click:()=>{
                    return eventController.handler('fitBest');
                }
            },{
                label:'Fit Width Mode',
                accelerator:'8',
                enabled:false,
                type:'radio',
                click:()=>{
                    return eventController.handler('fitWidth');
                }
            },{
                label:'Fit Height Mode',
                accelerator:'9',
                enabled:false,
                type:'radio',
                click:()=>{
                    return eventController.handler('fitHeight');
                }
            },{
                type:'separator'
            },{
                label:'Rotate 90 Degrees CW',
                accelerator:'[',
                enabled:false,
                click:()=>{
                    return eventController.handler('rotationCW');
                }
            },{
                label:'Rotate 90 Degrees CCW',
                accelerator:']',
                enabled:false,
                click:()=>{
                    return eventController.handler('rotationCCW');
                }
            }]
        },{
            label:'Navigation',
            submenu:[{
                label:'First Page',
                accelerator:'H',
                enabled:false,
                click:()=>{
                    return eventController.handler('firstPage');
                }
            },{
                label:'Previous Page',
                accelerator:'J',
                enabled:false,
                click:()=>{
                    return eventController.handler('previousPage');
                }
            },{
                label:'Next Page',
                accelerator:'K',
                enabled:false,
                click:()=>{
                    return eventController.handler('nextPage');
                }
            },{
                label:'Last Page',
                accelerator:'L',
                enabled:false,
                click:()=>{
                    return eventController.handler('lastPage');
                }
            }]
        }]));
    }
}

export default Menu;

