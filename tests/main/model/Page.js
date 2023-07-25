import 'should';
import Page from '../../../src/main/model/Page.js';

describe('Page',()=>{
    const page=new Page();

    it('Page.js#width',async()=>{
        const value=100;

        page.width=value;
        page.width.should.be.eql(value);
    });

    it('Page.js#height',async()=>{
        const value=100;

        page.height=value;
        page.height.should.be.eql(value);
    });

    it('Page.js#isHorizontal',async()=>{
        const width=100,
            height=50;

        page.width=width;
        page.height=height;
        page.isHorizontal().should.be.eql(true);
    });

    it('Page.js#isVertical',async()=>{
        const width=100,
            height=150;

        page.width=width;
        page.height=height;
        page.isVertical().should.be.eql(true);
    });
});

