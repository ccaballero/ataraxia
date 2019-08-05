const menu=require('electron').Menu;

class Menu {
    static load(app,events){
        menu.setApplicationMenu(menu.buildFromTemplate([{
            label:'File'
          , submenu:[{
                label:'Open'
              , accelerator:'CmdOrCtrl+O'
              , click:events.handle('open-file')
//            },{
//                label:'Collection'
//              , accelerator:'CmdOrCtrl+C'
//              , click:events.handle('open-collection')
            },{
                type:'separator'
            },{
                label:'Close'
              , accelerator:'CmdOrCtrl+W'
              , click:events.handle('close-file')
            },{
                label:'Quit'
              , accelerator:'CmdOrCtrl+Q'
              , click:events.handle('quit')
            }]
        },{
            label:'View'
          , submenu:[{
                label:'Toolbar'
              , click:events.handle('view-toolbar')
            },{
                label:'Statusbar'
              , click:events.handle('view-statusbar')
            },{
                type:'separator'
            },{
                label:'Fullscreen'
              , accelerator:'F'
              , click:events.handle('fullscreen')
            },{
                label:'Double page'
              , accelerator:'D'
              , type:'checkbox'
              , click:events.handle('double-page')
            },{
                label:'Manga mode'
              , accelerator:'M'
              , type:'checkbox'
              , click:events.handle('manga-mode')
            },{
                type:'separator'
            },{
                label:'Best fit mode'
              , accelerator:'B'
              , type:'radio'
              , click:events.handle('fit-best')
            },{
                label:'Fit width mode'
              , accelerator:'W'
              , type:'radio'
              , click:events.handle('fit-width')
            },{
                label:'Fit height mode'
              , accelerator:'H'
              , type:'radio'
              , click:events.handle('fit-height')
            },{
                type:'separator'
            },{
                label:'Rotate 90 degrees CW'
              , accelerator:'R'
              , click:events.handle('rotate-cw')
            },{
                label:'Rotate 90 degrees CCW'
              , accelerator:'Shift+R'
              , click:events.handle('rotate-ccw')
            }]
        },{
            label:'Navigation'
          , submenu:[{
                label:'First page'
              , accelerator:'Home'
              , click:events.handle('first-page')
            },{
                label:'Previous page'
              , accelerator:'PageUp'
              , click:events.handle('previous-page')
            },{
                label:'Next page'
              , accelerator:'PageDown'
              , click:events.handle('next-page')
            },{
                label:'Last page'
              , accelerator:'End'
              , click:events.handle('last-page')
            }]
        }]));
    }
}

module.exports=Menu;

