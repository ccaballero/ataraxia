import 'should';
import {join} from 'path';
import App from '../../../src/main/controllers/App.js';
import configTest from '../../../tests/config/app.js';

describe('App',()=>{
    const config=configTest(),
        app=new App(null,config.cacheDir,config.pagesDir);

    it('App.js#toolbar',async()=>{
        const value=app.getToolbar();

        value.should.be.Boolean();

        app.toogleToolbar();
        app.getToolbar().should.be.eql(!value);
    });

    it('App.js#statusbar',async()=>{
        const value=app.getStatusbar();

        value.should.be.Boolean();

        app.toogleStatusbar();
        app.getStatusbar().should.be.eql(!value);
    });

    it('App.js#fullscreen',async()=>{
        const value=app.getFullscreen();

        value.should.be.Boolean();

        app.toogleFullscreen();
        app.getFullscreen().should.be.eql(!value);
    });

    it('App.js#doublepage',async()=>{
        const value=app.getDoublepage();

        value.should.be.Boolean();

        app.toogleDoublepage();
        app.getDoublepage().should.be.eql(!value);
    });

    it('App.js#mangamode',async()=>{
        const value=app.getMangamode();

        value.should.be.Boolean();

        app.toogleMangamode();
        app.getMangamode().should.be.eql(!value);
    });

    it('App.js#fitmode',async()=>{
        const value=app.getFitmode();

        value.should.be.String();

        app.setFitmode('width');
        app.getFitmode().should.be.eql('width');
    });

    it('App.js#rotation',async()=>{
        const value=app.getRotation();

        value.should.be.Number();

        app.setRotation(180);
        app.getRotation().should.be.eql(180);
    });

    it('App.js#openFile',async()=>{
        const filepath=join(config.folder,config.books[0]);

        await app.openFile(filepath);
    });

    it('App.js#navigation(desc)(single)',async()=>{
        app.toogleDoublepage();
        app.toogleMangamode();

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
        app.toogleDoublepage();

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

