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
      , ROTATE_CW
      , ROTATE_CCW
      , FIRST_PAGE
      , PREVIOUS_PAGE
      , NEXT_PAGE
      , LAST_PAGE
    }=require('../constants');

class Menu {
    static load(app,events){
        menu.setApplicationMenu(menu.buildFromTemplate([{
            label:'File'
          , submenu:[{
                label:'Open'
              , accelerator:'CmdOrCtrl+O'
              , click:events.handle(OPEN_FILE)
//            },{
//                label:'Collection'
//              , accelerator:'CmdOrCtrl+C'
//              , click:events.handle('open-collection')
            },{
                type:'separator'
            },{
                label:'Close'
              , accelerator:'CmdOrCtrl+W'
              , click:events.handle(CLOSE_FILE)
            },{
                label:'Quit'
              , accelerator:'CmdOrCtrl+Q'
              , click:events.handle(QUIT)
            }]
        },{
            label:'View'
          , submenu:[{
                label:'Toolbar'
              , click:events.handle(VIEW_TOOLBAR)
            },{
                label:'Statusbar'
              , click:events.handle(VIEW_STATUSBAR)
            },{
                type:'separator'
            },{
                label:'Fullscreen'
              , accelerator:'F'
              , click:events.handle(FULLSCREEN)
            },{
                label:'Double page'
              , accelerator:'D'
              , type:'checkbox'
              , click:events.handle(DOUBLE_PAGE)
            },{
                label:'Manga mode'
              , accelerator:'M'
              , type:'checkbox'
              , click:events.handle(MANGA_MODE)
            },{
                type:'separator'
            },{
                label:'Best fit mode'
              , accelerator:'B'
              , type:'radio'
              , click:events.handle(FIT_BEST)
            },{
                label:'Fit width mode'
              , accelerator:'W'
              , type:'radio'
              , click:events.handle(FIT_WIDTH)
            },{
                label:'Fit height mode'
              , accelerator:'H'
              , type:'radio'
              , click:events.handle(FIT_HEIGHT)
            },{
                type:'separator'
            },{
                label:'Rotate 90 degrees CW'
              , accelerator:'R'
              , click:events.handle(ROTATE_CW)
            },{
                label:'Rotate 90 degrees CCW'
              , accelerator:'Shift+R'
              , click:events.handle(ROTATE_CCW)
            }]
        },{
            label:'Navigation'
          , submenu:[{
                label:'First page'
              , accelerator:'Home'
              , click:events.handle(FIRST_PAGE)
            },{
                label:'Previous page'
              , accelerator:'PageUp'
              , click:events.handle(PREVIOUS_PAGE)
            },{
                label:'Next page'
              , accelerator:'PageDown'
              , click:events.handle(NEXT_PAGE)
            },{
                label:'Last page'
              , accelerator:'End'
              , click:events.handle(LAST_PAGE)
            }]
        }]));
    }
}

module.exports=Menu;

