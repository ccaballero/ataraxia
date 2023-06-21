import 'should';
import {join} from 'path';
import App from '../../../src/main/controllers/App.js';
import configTest from '../../../tests/config/test.js';

describe('App',()=>{
    const config=configTest(),
        app=new App(null,config);

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
        app.setReadMode('mangaPage');

        let viewer=app.firstPage(),
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

                viewer=app.nextPage();
            }catch(error){
                loop=false;
            }
        }
    });

    it('App.js#navigation(asc)(single)',async()=>{
        let viewer=app.lastPage(),
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

                viewer=app.previousPage();
            }catch(error){
                loop=false;
            }
        }
    });

    it('App.js#navigation(desc)(double)',async()=>{
        app.setPageMode('doublePage');

        let viewer=app.firstPage(),
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

                viewer=app.nextPage();
            }catch(error){
                loop=false;
            }
        }
    });

    it('App.js#navigation(asc)(double)',async()=>{
        let viewer=app.lastPage(),
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
                    viewer[1].index.should.be.eql(app.book.current+1);

                    console.log(
                        'progress: %s-%s/%s [%s]',
                        app.book.current-1,
                        app.book.current,
                        app.book.total,
                        viewer.map(v=>v.toString()).join('|')
                    );
                }

                viewer=app.previousPage();
            }catch(error){
                loop=false;
            }
        }
    });

    it('App.js#closeFile',async()=>{
        await app.closeFile();
    });

    it('App.js#quit',async()=>{
        await app.quit();
    });
});

