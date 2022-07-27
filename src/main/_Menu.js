import electron from 'electron';
import {
    OPEN_FILE,
    CLOSE_FILE,
    SETTINGS,
    QUIT,
    VIEW_TOOLBAR,
    VIEW_STATUSBAR,
    FULLSCREEN,
    DOUBLE_PAGE,
    MANGA_MODE,
    FIT_BEST,
    FIT_WIDTH,
    FIT_HEIGHT,
    ROTATE_CW,
    ROTATE_CCW,
    FIRST_PAGE,
    PREVIOUS_PAGE,
    NEXT_PAGE,
    LAST_PAGE,
} from '../constants';

/* Mnemonics:
    0 => last page
    1 => first page
    2 => fit best
    3 => fit width
    4 => fit height

    { => rotate cw
    } => rotate ccw

    c => open collection
    d => double page
    f => fullscreen
    h => previous page
    l => next page
    m => manga mode
    o => open file
    p => settings
    q => quit
    s => save book
    t => view toolbar
    w => close file
    y => view statusbar
 */

class Menu{
    static load(app,events){
        electron.menu.setApplicationMenu(electron.menu.buildFromTemplate([{
            label:'File',
            submenu:[{
                label:'Open',
                accelerator:'O',
                click:events.handle(OPEN_FILE)
            },{
                label:'Close',
                accelerator:'W',
                enabled:false,
                click:events.handle(CLOSE_FILE)
            },{
                type:'separator'
            },{
                type:'separator'
            },{
                label:'Settings',
                accelerator:'P',
                enabled:true,
                click:events.handle(SETTINGS)
            },{
                type:'separator'
            },{
                label:'Quit',
                accelerator:'Q',
                click:events.handle(QUIT)
            }]
        },{
            label:'View',
            submenu:[{
                label:'Toolbar',
                accelerator:'T',
                click:events.handle(VIEW_TOOLBAR)
            },{
                label:'Statusbar',
                accelerator:'Y',
                click:events.handle(VIEW_STATUSBAR)
            },{
                type:'separator'
            },{
                label:'Fullscreen',
                accelerator:'F',
                click:events.handle(FULLSCREEN)
            },{
                label:'Double page',
                accelerator:'D',
                enabled:false,
                type:'checkbox',
                checked:false,
                click:events.handle(DOUBLE_PAGE)
            },{
                label:'Manga mode',
                accelerator:'M',
                enabled:false,
                type:'checkbox',
                click:events.handle(MANGA_MODE)
            },{
                type:'separator'
            },{
                label:'Best fit mode',
                accelerator:'2',
                enabled:false,
                type:'radio',
                click:events.handle(FIT_BEST)
            },{
                label:'Fit width mode',
                accelerator:'3',
                enabled:false,
                type:'radio',
                click:events.handle(FIT_WIDTH)
            },{
                label:'Fit height mode',
                accelerator:'4',
                enabled:false,
                type:'radio',
                click:events.handle(FIT_HEIGHT)
            },{
                type:'separator'
            },{
                label:'Rotate 90 degrees CW',
                accelerator:'{',
                enabled:false,
                click:events.handle(ROTATE_CW)
            },{
                label:'Rotate 90 degrees CCW',
                accelerator:'}',
                enabled:false,
                click:events.handle(ROTATE_CCW)
            }]
        },{
            label:'Navigation',
            submenu:[{
                label:'First page',
                accelerator:'1',
                enabled:false,
                click:events.handle(FIRST_PAGE)
            },{
                label:'Previous page',
                accelerator:'H',
                enabled:false,
                click:events.handle(PREVIOUS_PAGE)
            },{
                label:'Next page',
                accelerator:'L',
                enabled:false,
                click:events.handle(NEXT_PAGE)
            },{
                label:'Last page',
                accelerator:'0',
                enabled:false,
                click:events.handle(LAST_PAGE)
            }]
        }]));
    }
}

export default Menu;

