const menu=require('electron').Menu
  , {
        OPEN_FILE
      , CLOSE_FILE
      , QUIT
      , VIEW_TOOLBAR
      , VIEW_STATUSBAR
      , FULLSCREEN
      , DOUBLE_PAGE
      , MANGA_MODE
      , FIT_BEST
      , FIT_WIDTH
      , FIT_HEIGHT
//      , ROTATE_CW
//      , ROTATE_CCW
      , FIRST_PAGE
      , PREVIOUS_PAGE
      , NEXT_PAGE
      , LAST_PAGE
    }=require('../constants');

/* Mnemonic:
    0 => last page
    1 => first page
    2 => fit best
    3 => fit width
    4 => fit height

    d => double page
    f => fullscreen
    h => previous page
    l => next page
    m => manga mode
    o => open file
    q => quit
    s => view statusbar
    t => view toolbar
    w => close file

 */

class Menu {
    static load(app,events){
        menu.setApplicationMenu(menu.buildFromTemplate([{
            label:'File'
          , submenu:[{
                label:'Open'
              , accelerator:'o'
              , click:events.handle(OPEN_FILE)
            },{
                type:'separator'
            },{
                label:'Close'
              , accelerator:'w'
              , click:events.handle(CLOSE_FILE)
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
              , accelerator:'s'
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
              , type:'checkbox'
              , checked:true
              , click:events.handle(DOUBLE_PAGE)
            },{
                label:'Manga mode'
              , accelerator:'m'
              , type:'checkbox'
              , click:events.handle(MANGA_MODE)
            },{
                type:'separator'
            },{
                label:'Best fit mode'
              , accelerator:'2'
              , type:'radio'
              , click:events.handle(FIT_BEST)
            },{
                label:'Fit width mode'
              , accelerator:'3'
              , type:'radio'
              , click:events.handle(FIT_WIDTH)
            },{
                label:'Fit height mode'
              , accelerator:'4'
              , type:'radio'
              , click:events.handle(FIT_HEIGHT)
/*            },{
                type:'separator'
            },{
                label:'Rotate 90 degrees CW'
              , accelerator:'R'
              , click:events.handle(ROTATE_CW)
            },{
                label:'Rotate 90 degrees CCW'
              , accelerator:'Shift+R'
              , click:events.handle(ROTATE_CCW)*/
            }]
        },{
            label:'Navigation'
          , submenu:[{
                label:'First page'
              , accelerator:'1'
              , click:events.handle(FIRST_PAGE)
            },{
                label:'Previous page'
              , accelerator:'h'
              , click:events.handle(PREVIOUS_PAGE)
            },{
                label:'Next page'
              , accelerator:'l'
              , click:events.handle(NEXT_PAGE)
            },{
                label:'Last page'
              , accelerator:'0'
              , click:events.handle(LAST_PAGE)
            }]
        }]));
    }
}

module.exports=Menu;

