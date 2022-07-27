import 'should';
import Store from '../../../src/main/store/Store.js';
import Viewport from '../../../src/main/models/Viewport.js';

describe('Viewport',()=>{
    const store=new Store(),
        viewport=new Viewport(store);

    it('Viewport.js#toolbar',async()=>{
        const value=true;

        viewport.toolbar=value;
        viewport.toolbar.should.be.eql(value);

        viewport.toolbar=!value;
        viewport.toolbar.should.be.eql(!value);
    });

    it('Viewport.js#statusbar',async()=>{
        const value=true;

        viewport.statusbar=value;
        viewport.statusbar.should.be.eql(value);

        viewport.statusbar=!value;
        viewport.statusbar.should.be.eql(!value);
    });

    it('Viewport.js#fullscreen',async()=>{
        const value=true;

        viewport.fullscreen=value;
        viewport.fullscreen.should.be.eql(value);

        viewport.fullscreen=!value;
        viewport.fullscreen.should.be.eql(!value);
    });

    it('Viewport.js#doublepage',async()=>{
        const value=true;

        viewport.doublepage=value;
        viewport.doublepage.should.be.eql(value);

        viewport.doublepage=!value;
        viewport.doublepage.should.be.eql(!value);
    });

    it('Viewport.js#mangamode',async()=>{
        const value=true;

        viewport.mangamode=value;
        viewport.mangamode.should.be.eql(value);

        viewport.mangamode=!value;
        viewport.mangamode.should.be.eql(!value);
    });

    it('Viewport.js#fitmode',async()=>{
        const value='best';

        viewport.fitmode=value;
        viewport.fitmode.should.be.eql(value);
    });

    it('Viewport.js#rotation',async()=>{
        const value=0;

        viewport.rotation=value;
        viewport.rotation.should.be.eql(value);
    });
});

