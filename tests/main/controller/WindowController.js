import 'should';
import {join} from 'path';
import WindowController from '../../../src/main/controller/WindowController.js';
import configTest from '../../../tests/config/test.js';

describe('WindowController',()=>{
    const config=configTest(),
        windowController=new WindowController(null,{dev:true});

    it('WindowController.js#toolBar',async()=>{
        const value=windowController.toolBar;

        value.should.be.Boolean();

        windowController.toogleToolBar();
        windowController.toolBar.should.be.eql(!value);
    });

    it('WindowController.js#statusBar',async()=>{
        const value=windowController.statusBar;

        value.should.be.Boolean();

        windowController.toogleStatusBar();
        windowController.statusBar.should.be.eql(!value);
    });

    it('WindowController.js#fullScreen',async()=>{
        const value=windowController.fullScreen;

        value.should.be.Boolean();

        windowController.toogleFullScreen();
        windowController.fullScreen.should.be.eql(!value);
    });

    it('WindowController.js#pageMode',async()=>{
        const value=windowController.pageMode;

        value.should.be.String();

        windowController.pageMode='doublePage';
        windowController.pageMode.should.be.eql('doublePage');
    });

    it('WindowController.js#readMode',async()=>{
        const value=windowController.readMode;

        value.should.be.String();

        windowController.readMode='mangaMode';
        windowController.readMode.should.be.eql('mangaMode');
    });

    it('WindowController.js#fitMode',async()=>{
        const value=windowController.fitMode;

        value.should.be.String();

        windowController.fitMode='fitWidth';
        windowController.fitMode.should.be.eql('fitWidth');
    });

    it('WindowController.js#rotation',async()=>{
        const value=windowController.rotation;

        value.should.be.Number();

        windowController.rotation=180;
        windowController.rotation.should.be.eql(180);
    });

    it('WindowController.js#openFile',async()=>{
        const filePath=join(config.folder,config.books[0]);

        await windowController.openFile(filePath);
    });

    it('WindowController.js#navigation(desc)(single)',async()=>{
        windowController.pageMode='singlePage';
        windowController.readMode='comicMode';

        let viewer=windowController.firstPage(false),
            loop=true;

        while(loop){
            try{
                viewer.length.should.be.eql(1);
                viewer[0].index.should.be.eql(windowController.book.current);

                console.log(
                    'progress: %s/%s [%s]',
                    windowController.book.current,
                    windowController.book.total,
                    viewer.map(v=>v.toString()).join('|')
                );

                viewer=windowController.nextPage(false);
            }catch(error){
                error.message.should.be.eql('next_error');

                loop=false;
            }
        }
    });

    it('WindowController.js#navigation(asc)(single)',async()=>{
        windowController.pageMode='singlePage';
        windowController.readMode='comicMode';

        let viewer=windowController.lastPage(false),
            loop=true;

        while(loop){
            try{
                viewer.length.should.be.eql(1);
                viewer[0].index.should.be.eql(windowController.book.current);

                console.log(
                    'progress: %s/%s [%s]',
                    windowController.book.current,
                    windowController.book.total,
                    viewer.map(v=>v.toString()).join('|')
                );

                viewer=windowController.previousPage(false);
            }catch(error){
                error.message.should.be.eql('previous_error');

                loop=false;
            }
        }
    });

    it('WindowController.js#navigation(desc)(double)(comic)',async()=>{
        windowController.pageMode='doublePage';
        windowController.readMode='comicMode';

        let viewer=windowController.firstPage(false),
            loop=true;

        while(loop){
            try{
                if(viewer.length===1){
                    viewer.length.should.be.eql(1);
                    viewer[0].index.should.be.eql(
                        windowController.book.current
                    );

                    console.log(
                        'progress: %s/%s [%s]',
                        windowController.book.current,
                        windowController.book.total,
                        viewer.map(v=>v.toString()).join('|')
                    );
                }else{
                    viewer.length.should.be.eql(2);
                    viewer[0].index.should.be.eql(
                        windowController.book.current-1
                    );
                    viewer[1].index.should.be.eql(
                        windowController.book.current
                    );

                    console.log(
                        'progress: %s-%s/%s [%s]',
                        windowController.book.current-1,
                        windowController.book.current,
                        windowController.book.total,
                        viewer.map(v=>v.toString()).join('|')
                    );
                }

                viewer=windowController.nextPage(false);
            }catch(error){
                error.message.should.be.eql('next_error');

                loop=false;
            }
        }
    });

    it('WindowController.js#navigation(desc)(double)(manga)',async()=>{
        windowController.pageMode='doublePage';
        windowController.readMode='mangaMode';

        let viewer=windowController.firstPage(false),
            loop=true;

        while(loop){
            try{
                if(viewer.length===1){
                    viewer.length.should.be.eql(1);
                    viewer[0].index.should.be.eql(
                        windowController.book.current
                    );

                    console.log(
                        'progress: %s/%s [%s]',
                        windowController.book.current,
                        windowController.book.total,
                        viewer.map(v=>v.toString()).join('|')
                    );
                }else{
                    viewer.length.should.be.eql(2);
                    viewer[0].index.should.be.eql(
                        windowController.book.current
                    );
                    viewer[1].index.should.be.eql(
                        windowController.book.current-1
                    );

                    console.log(
                        'progress: %s-%s/%s [%s]',
                        windowController.book.current-1,
                        windowController.book.current,
                        windowController.book.total,
                        viewer.map(v=>v.toString()).join('|')
                    );
                }

                viewer=windowController.nextPage(false);
            }catch(error){
                error.message.should.be.eql('next_error');

                loop=false;
            }
        }
    });

    it('WindowController.js#navigation(asc)(double)(comic)',async()=>{
        windowController.pageMode='doublePage';
        windowController.readMode='comicMode';

        let viewer=windowController.lastPage(false),
            loop=true;

        while(loop){
            try{
                if(viewer.length===1){
                    viewer.length.should.be.eql(1);
                    viewer[0].index.should.be.eql(
                        windowController.book.current
                    );

                    console.log(
                        'progress: %s/%s [%s]',
                        windowController.book.current,
                        windowController.book.total,
                        viewer.map(v=>v.toString()).join('|')
                    );
                }else{
                    viewer.length.should.be.eql(2);
                    viewer[0].index.should.be.eql(
                        windowController.book.current-1
                    );
                    viewer[1].index.should.be.eql(
                        windowController.book.current
                    );

                    console.log(
                        'progress: %s-%s/%s [%s]',
                        windowController.book.current-1,
                        windowController.book.current,
                        windowController.book.total,
                        viewer.map(v=>v.toString()).join('|')
                    );
                }

                viewer=windowController.previousPage(false);
            }catch(error){
                error.message.should.be.eql('previous_error');

                loop=false;
            }
        }
    });

    it('WindowController.js#navigation(asc)(double)(manga)',async()=>{
        windowController.pageMode='doublePage';
        windowController.readMode='mangaMode';

        let viewer=windowController.lastPage(false),
            loop=true;

        while(loop){
            try{
                if(viewer.length===1){
                    viewer.length.should.be.eql(1);
                    viewer[0].index.should.be.eql(
                        windowController.book.current
                    );

                    console.log(
                        'progress: %s/%s [%s]',
                        windowController.book.current,
                        windowController.book.total,
                        viewer.map(v=>v.toString()).join('|')
                    );
                }else{
                    viewer.length.should.be.eql(2);
                    viewer[0].index.should.be.eql(
                        windowController.book.current
                    );
                    viewer[1].index.should.be.eql(
                        windowController.book.current-1
                    );

                    console.log(
                        'progress: %s-%s/%s [%s]',
                        windowController.book.current-1,
                        windowController.book.current,
                        windowController.book.total,
                        viewer.map(v=>v.toString()).join('|')
                    );
                }

                viewer=windowController.previousPage(false);
            }catch(error){
                error.message.should.be.eql('previous_error');

                loop=false;
            }
        }
    });

    it('WindowController.js#navigation(random)(random)',async()=>{
        windowController.pageMode='doublePage';
        windowController.readMode='mangaMode';

        let viewer=windowController.firstPage(false);

        viewer.length.should.be.eql(1);
        viewer[0].index.should.be.eql(windowController.book.current);

        console.log(
            'progress: %s/%s [%s]',
            windowController.book.current,
            windowController.book.total,
            viewer.map(v=>v.toString()).join('|')
        );

        windowController.pageMode='singlePage';

        viewer=windowController.nextPage(false);

        viewer.length.should.be.eql(1);
        viewer[0].index.should.be.eql(windowController.book.current);

        console.log(
            'progress: %s/%s [%s]',
            windowController.book.current,
            windowController.book.total,
            viewer.map(v=>v.toString()).join('|')
        );

        windowController.pageMode='doublePage';

        viewer=windowController.nextPage(false);

        viewer[0].index.should.be.eql(windowController.book.current);
        viewer[1].index.should.be.eql(windowController.book.current-1);

        console.log(
            'progress: %s-%s/%s [%s]',
            windowController.book.current-1,
            windowController.book.current,
            windowController.book.total,
            viewer.map(v=>v.toString()).join('|')
        );

        windowController.readMode='comicMode';

        viewer=windowController.nextPage(false);

        viewer[0].index.should.be.eql(windowController.book.current-1);
        viewer[1].index.should.be.eql(windowController.book.current);

        console.log(
            'progress: %s-%s/%s [%s]',
            windowController.book.current-1,
            windowController.book.current,
            windowController.book.total,
            viewer.map(v=>v.toString()).join('|')
        );

        windowController.readMode='mangaMode';

        viewer=windowController.currentPage(false);

        viewer[0].index.should.be.eql(windowController.book.current);
        viewer[1].index.should.be.eql(windowController.book.current-1);

        console.log(
            'progress: %s-%s/%s [%s]',
            windowController.book.current-1,
            windowController.book.current,
            windowController.book.total,
            viewer.map(v=>v.toString()).join('|')
        );
    });

    it('WindowController.js#goToPage(single)',async()=>{
        windowController.pageMode='singlePage';

        const viewer=windowController.goToPage(10,false);

        viewer.length.should.be.eql(1);
        viewer[0].index.should.be.eql(windowController.book.current);

        console.log(
            'progress: %s/%s [%s]',
            windowController.book.current,
            windowController.book.total,
            viewer.map(v=>v.toString()).join('|')
        );
    });

    it('WindowController.js#goToPage(double)',async()=>{
        windowController.pageMode='doublePage';
        windowController.readMode='mangaMode';

        const viewer=windowController.goToPage(3,false);

        viewer.length.should.be.eql(2);
        viewer[0].index.should.be.eql(windowController.book.current+1);
        viewer[1].index.should.be.eql(windowController.book.current);

        console.log(
            'progress: %s/%s [%s]',
            windowController.book.current,
            windowController.book.total,
            viewer.map(v=>v.toString()).join('|')
        );
    });

    it('WindowController.js#closeFile',async()=>{
        await windowController.closeFile();
    });

    it('WindowController.js#quit',async()=>{
        await windowController.quit();
    });
});

