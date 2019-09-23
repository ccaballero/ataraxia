const menu=require('electron').Menu
  , {
        OPEN_FILE
//      , SAVE_FILE
      , CLOSE_FILE
//      , OPEN_COLLECTION
//      , CLOSE_COLLECTION
      , SETTINGS
      , QUIT
      , VIEW_TOOLBAR
      , VIEW_STATUSBAR
      , FULLSCREEN
      , DOUBLE_PAGE
      , MANGA_MODE
      , FIT_BEST
      , FIT_WIDTH
      , FIT_HEIGHT
      , ROTATE_CW
      , ROTATE_CCW
      , FIRST_PAGE
      , PREVIOUS_PAGE
      , NEXT_PAGE
      , LAST_PAGE
    }=require('../constants');

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

class Menu {
    static load(app,events){
        menu.setApplicationMenu(menu.buildFromTemplate([{
            label:'File'
          , submenu:[{
                label:'Open'
              , accelerator:'o'
              , click:events.handle(OPEN_FILE)
/*            },{
                label:'Save'
              , accelerator:'s'
              , enabled:false
              , click:events.handle(SAVE_FILE)*/
            },{
                label:'Close'
              , accelerator:'w'
              , enabled:false
              , click:events.handle(CLOSE_FILE)
            },{
                type:'separator'
/*            },{
                label:'Open Collection'
              , accelerator:'c'
              , enabled:false
              , click:events.handle(OPEN_COLLECTION)*/
            },{
                type:'separator'
            },{
                label:'Settings'
              , accelerator:'P'
              , enabled:true
              , click:events.handle(SETTINGS)
            },{
                type:'separator'
            },{
                label:'Quit'
              , accelerator:'q'
              , click:events.handle(QUIT)
            }]
        },{
            label:'View'
          , submenu:[{
                label:'Toolbar'
              , accelerator:'t'
              , click:events.handle(VIEW_TOOLBAR)
            },{
                label:'Statusbar'
              , accelerator:'y'
              , click:events.handle(VIEW_STATUSBAR)
            },{
                type:'separator'
            },{
                label:'Fullscreen'
              , accelerator:'f'
              , click:events.handle(FULLSCREEN)
            },{
                label:'Double page'
              , accelerator:'d'
              , enabled:false
              , type:'checkbox'
              , checked:false
              , click:events.handle(DOUBLE_PAGE)
            },{
                label:'Manga mode'
              , accelerator:'m'
              , enabled:false
              , type:'checkbox'
              , click:events.handle(MANGA_MODE)
            },{
                type:'separator'
            },{
                label:'Best fit mode'
              , accelerator:'2'
              , enabled:false
              , type:'radio'
              , click:events.handle(FIT_BEST)
            },{
                label:'Fit width mode'
              , accelerator:'3'
              , enabled:false
              , type:'radio'
              , click:events.handle(FIT_WIDTH)
            },{
                label:'Fit height mode'
              , accelerator:'4'
              , enabled:false
              , type:'radio'
              , click:events.handle(FIT_HEIGHT)
            },{
                type:'separator'
            },{
                label:'Rotate 90 degrees CW'
              , accelerator:'{'
              , enabled:false
              , click:events.handle(ROTATE_CW)
            },{
                label:'Rotate 90 degrees CCW'
              , accelerator:'}'
              , enabled:false
              , click:events.handle(ROTATE_CCW)
            }]
        },{
            label:'Navigation'
          , submenu:[{
                label:'First page'
              , accelerator:'1'
              , enabled:false
              , click:events.handle(FIRST_PAGE)
            },{
                label:'Previous page'
              , accelerator:'h'
              , enabled:false
              , click:events.handle(PREVIOUS_PAGE)
            },{
                label:'Next page'
              , accelerator:'l'
              , enabled:false
              , click:events.handle(NEXT_PAGE)
            },{
                label:'Last page'
              , accelerator:'0'
              , enabled:false
              , click:events.handle(LAST_PAGE)
            }]
        }]));
    }
}

module.exports=Menu;

