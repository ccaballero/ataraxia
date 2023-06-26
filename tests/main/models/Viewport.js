import 'should';
import Store from '../../../src/main/store/Store.js';
import Viewport from '../../../src/main/models/Viewport.js';

describe('Viewport',()=>{
    const store=new Store(),
        viewport=new Viewport(store);

    it('Viewport.js#toolBar',async()=>{
        const value=true;

        viewport.toolBar=value;
        viewport.toolBar.should.be.eql(value);

        viewport.toolBar=!value;
        viewport.toolBar.should.be.eql(!value);
    });

    it('Viewport.js#statusBar',async()=>{
        const value=true;

        viewport.statusBar=value;
        viewport.statusBar.should.be.eql(value);

        viewport.statusBar=!value;
        viewport.statusBar.should.be.eql(!value);
    });

    it('Viewport.js#fullScreen',async()=>{
        const value=true;

        viewport.fullScreen=value;
        viewport.fullScreen.should.be.eql(value);

        viewport.fullScreen=!value;
        viewport.fullScreen.should.be.eql(!value);
    });

    it('Viewport.js#pageMode',async()=>{
        const value='singlePage';

        viewport.pageMode=value;
        viewport.pageMode.should.be.eql(value);

        viewport.pageMode=!value;
        viewport.pageMode.should.be.eql(!value);
    });

    it('Viewport.js#mangaMode',async()=>{
        const value='mangaMode';

        viewport.mangaMode=value;
        viewport.mangaMode.should.be.eql(value);

        viewport.mangaMode=!value;
        viewport.mangaMode.should.be.eql(!value);
    });

    it('Viewport.js#fitMode',async()=>{
        const value='fitBest';

        viewport.fitMode=value;
        viewport.fitMode.should.be.eql(value);
    });

    it('Viewport.js#rotation',async()=>{
        const value=0;

        viewport.rotation=value;
        viewport.rotation.should.be.eql(value);
    });
});

