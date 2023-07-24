import 'should';
import Store from '../../../src/main/store/Store.js';
import Viewport from '../../../src/main/model/Viewport.js';

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
        const value1='singlePage';

        viewport.pageMode=value1;
        viewport.pageMode.should.be.eql(value1);

        const value2='doublePage';

        viewport.pageMode=value2;
        viewport.pageMode.should.be.eql(value2);
    });

    it('Viewport.js#readMode',async()=>{
        const value1='comicMode';

        viewport.readMode=value1;
        viewport.readMode.should.be.eql(value1);

        const value2='mangaMode';

        viewport.readMode=value2;
        viewport.readMode.should.be.eql(value2);
    });

    it('Viewport.js#fitMode',async()=>{
        const value1='fitWidth';

        viewport.fitMode=value1;
        viewport.fitMode.should.be.eql(value1);

        const value2='fitHeight';

        viewport.fitMode=value2;
        viewport.fitMode.should.be.eql(value2);

        const value3='fitBest';

        viewport.fitMode=value3;
        viewport.fitMode.should.be.eql(value3);
    });

    it('Viewport.js#rotation',async()=>{
        const value1=0;

        viewport.rotation=value1;
        viewport.rotation.should.be.eql(value1);

        const value2=90;

        viewport.rotation=value2;
        viewport.rotation.should.be.eql(value2);

        const value3=180;

        viewport.rotation=value3;
        viewport.rotation.should.be.eql(value3);

        const value4=270;

        viewport.rotation=value4;
        viewport.rotation.should.be.eql(value4);

    });
});

