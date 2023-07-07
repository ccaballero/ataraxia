import 'should';
import {join} from 'path';
import App from '../../../src/main/controllers/App.js';
import configTest from '../../../tests/config/test.js';

describe('App',()=>{
    const config=configTest(),
        app=new App(null,{dev:true});

    it('App.js#toolBar',async()=>{
        const value=app.getToolBar();

        value.should.be.Boolean();

        app.toogleToolBar();
        app.getToolBar().should.be.eql(!value);
    });

    it('App.js#statusBar',async()=>{
        const value=app.getStatusBar();

        value.should.be.Boolean();

        app.toogleStatusBar();
        app.getStatusBar().should.be.eql(!value);
    });

    it('App.js#fullScreen',async()=>{
        const value=app.getFullScreen();

        value.should.be.Boolean();

        app.toogleFullScreen();
        app.getFullScreen().should.be.eql(!value);
    });

    it('App.js#pageMode',async()=>{
        const value=app.getPageMode();

        value.should.be.String();

        app.setPageMode('doublePage');
        app.getPageMode().should.be.eql('doublePage');
    });

    it('App.js#readMode',async()=>{
        const value=app.getReadMode();

        value.should.be.String();

        app.setReadMode('mangaMode');
        app.getReadMode().should.be.eql('mangaMode');
    });

    it('App.js#fitMode',async()=>{
        const value=app.getFitMode();

        value.should.be.String();

        app.setFitMode('fitWidth');
        app.getFitMode().should.be.eql('fitWidth');
    });

    it('App.js#rotation',async()=>{
        const value=app.getRotation();

        value.should.be.Number();

        app.setRotation(180);
        app.getRotation().should.be.eql(180);
    });

    it('App.js#openFile',async()=>{
        const filePath=join(config.folder,config.books[0]);

        await app.openFile(filePath);
    });

    it('App.js#navigation(desc)(single)',async()=>{
        app.setPageMode('singlePage');
        app.setReadMode('comicMode');

        let viewer=app.firstPage(false),
            loop=true;

        while(loop){
            try{
                viewer.length.should.be.eql(1);
                viewer[0].index.should.be.eql(app.book.current);

                console.log(
                    'progress: %s/%s [%s]',
                    app.book.current,
                    app.book.total,
                    viewer.map(v=>v.toString()).join('|')
                );

                viewer=app.nextPage(false);
            }catch(error){
                error.message.should.be.eql('next_error');

                loop=false;
            }
        }
    });

    it('App.js#navigation(asc)(single)',async()=>{
        app.setPageMode('singlePage');
        app.setReadMode('comicMode');

        let viewer=app.lastPage(false),
            loop=true;

        while(loop){
            try{
                viewer.length.should.be.eql(1);
                viewer[0].index.should.be.eql(app.book.current);

                console.log(
                    'progress: %s/%s [%s]',
                    app.book.current,
                    app.book.total,
                    viewer.map(v=>v.toString()).join('|')
                );

                viewer=app.previousPage(false);
            }catch(error){
                error.message.should.be.eql('previous_error');

                loop=false;
            }
        }
    });

    it('App.js#navigation(desc)(double)(comic)',async()=>{
        app.setPageMode('doublePage');
        app.setReadMode('comicMode');

        let viewer=app.firstPage(false),
            loop=true;

        while(loop){
            try{
                if(viewer.length===1){
                    viewer.length.should.be.eql(1);
                    viewer[0].index.should.be.eql(app.book.current);

                    console.log(
                        'progress: %s/%s [%s]',
                        app.book.current,
                        app.book.total,
                        viewer.map(v=>v.toString()).join('|')
                    );
                }else{
                    viewer.length.should.be.eql(2);
                    viewer[0].index.should.be.eql(app.book.current-1);
                    viewer[1].index.should.be.eql(app.book.current);

                    console.log(
                        'progress: %s-%s/%s [%s]',
                        app.book.current-1,
                        app.book.current,
                        app.book.total,
                        viewer.map(v=>v.toString()).join('|')
                    );
                }

                viewer=app.nextPage(false);
            }catch(error){
                error.message.should.be.eql('next_error');

                loop=false;
            }
        }
    });

    it('App.js#navigation(desc)(double)(manga)',async()=>{
        app.setPageMode('doublePage');
        app.setReadMode('mangaMode');

        let viewer=app.firstPage(false),
            loop=true;

        while(loop){
            try{
                if(viewer.length===1){
                    viewer.length.should.be.eql(1);
                    viewer[0].index.should.be.eql(app.book.current);

                    console.log(
                        'progress: %s/%s [%s]',
                        app.book.current,
                        app.book.total,
                        viewer.map(v=>v.toString()).join('|')
                    );
                }else{
                    viewer.length.should.be.eql(2);
                    viewer[0].index.should.be.eql(app.book.current);
                    viewer[1].index.should.be.eql(app.book.current-1);

                    console.log(
                        'progress: %s-%s/%s [%s]',
                        app.book.current-1,
                        app.book.current,
                        app.book.total,
                        viewer.map(v=>v.toString()).join('|')
                    );
                }

                viewer=app.nextPage(false);
            }catch(error){
                error.message.should.be.eql('next_error');

                loop=false;
            }
        }
    });

    it('App.js#navigation(asc)(double)(comic)',async()=>{
        app.setPageMode('doublePage');
        app.setReadMode('comicMode');

        let viewer=app.lastPage(false),
            loop=true;

        while(loop){
            try{
                if(viewer.length===1){
                    viewer.length.should.be.eql(1);
                    viewer[0].index.should.be.eql(app.book.current);

                    console.log(
                        'progress: %s/%s [%s]',
                        app.book.current,
                        app.book.total,
                        viewer.map(v=>v.toString()).join('|')
                    );
                }else{
                    viewer.length.should.be.eql(2);
                    viewer[0].index.should.be.eql(app.book.current-1);
                    viewer[1].index.should.be.eql(app.book.current);

                    console.log(
                        'progress: %s-%s/%s [%s]',
                        app.book.current-1,
                        app.book.current,
                        app.book.total,
                        viewer.map(v=>v.toString()).join('|')
                    );
                }

                viewer=app.previousPage(false);
            }catch(error){
                error.message.should.be.eql('previous_error');

                loop=false;
            }
        }
    });

    it('App.js#navigation(asc)(double)(manga)',async()=>{
        app.setPageMode('doublePage');
        app.setReadMode('mangaMode');

        let viewer=app.lastPage(false),
            loop=true;

        while(loop){
            try{
                if(viewer.length===1){
                    viewer.length.should.be.eql(1);
                    viewer[0].index.should.be.eql(app.book.current);

                    console.log(
                        'progress: %s/%s [%s]',
                        app.book.current,
                        app.book.total,
                        viewer.map(v=>v.toString()).join('|')
                    );
                }else{
                    viewer.length.should.be.eql(2);
                    viewer[0].index.should.be.eql(app.book.current);
                    viewer[1].index.should.be.eql(app.book.current-1);

                    console.log(
                        'progress: %s-%s/%s [%s]',
                        app.book.current-1,
                        app.book.current,
                        app.book.total,
                        viewer.map(v=>v.toString()).join('|')
                    );
                }

                viewer=app.previousPage(false);
            }catch(error){
                error.message.should.be.eql('previous_error');

                loop=false;
            }
        }
    });

    it('App.js#navigation(random)(random)',async()=>{
        app.setPageMode('doublePage');
        app.setReadMode('mangaMode');

        let viewer=app.firstPage(false);

        viewer.length.should.be.eql(1);
        viewer[0].index.should.be.eql(app.book.current);

        console.log(
            'progress: %s/%s [%s]',
            app.book.current,
            app.book.total,
            viewer.map(v=>v.toString()).join('|')
        );

        app.setPageMode('singlePage');
        viewer=app.nextPage(false);

        viewer.length.should.be.eql(1);
        viewer[0].index.should.be.eql(app.book.current);

        console.log(
            'progress: %s/%s [%s]',
            app.book.current,
            app.book.total,
            viewer.map(v=>v.toString()).join('|')
        );

        app.setPageMode('doublePage');
        viewer=app.nextPage(false);

        viewer[0].index.should.be.eql(app.book.current);
        viewer[1].index.should.be.eql(app.book.current-1);

        console.log(
            'progress: %s-%s/%s [%s]',
            app.book.current-1,
            app.book.current,
            app.book.total,
            viewer.map(v=>v.toString()).join('|')
        );

        app.setReadMode('comicMode');
        viewer=app.nextPage(false);

        viewer[0].index.should.be.eql(app.book.current-1);
        viewer[1].index.should.be.eql(app.book.current);

        console.log(
            'progress: %s-%s/%s [%s]',
            app.book.current-1,
            app.book.current,
            app.book.total,
            viewer.map(v=>v.toString()).join('|')
        );

        app.setReadMode('mangaMode');
        viewer=app.currentPage(false);

        viewer[0].index.should.be.eql(app.book.current);
        viewer[1].index.should.be.eql(app.book.current-1);

        console.log(
            'progress: %s-%s/%s [%s]',
            app.book.current-1,
            app.book.current,
            app.book.total,
            viewer.map(v=>v.toString()).join('|')
        );
    });

    it('App.js#goToPage(single)',async()=>{
        app.setPageMode('singlePage');

        const viewer=app.goToPage(10,false);

        viewer.length.should.be.eql(1);
        viewer[0].index.should.be.eql(app.book.current);

        console.log(
            'progress: %s/%s [%s]',
            app.book.current,
            app.book.total,
            viewer.map(v=>v.toString()).join('|')
        );
    });

    it('App.js#goToPage(double)',async()=>{
        app.setPageMode('doublePage');
        app.setReadMode('mangaMode');

        const viewer=app.goToPage(3,false);

        viewer.length.should.be.eql(2);
        viewer[0].index.should.be.eql(app.book.current+1);
        viewer[1].index.should.be.eql(app.book.current);

        console.log(
            'progress: %s/%s [%s]',
            app.book.current,
            app.book.total,
            viewer.map(v=>v.toString()).join('|')
        );
    });

    it('App.js#closeFile',async()=>{
        await app.closeFile();
    });

    it('App.js#quit',async()=>{
        await app.quit();
    });
});

