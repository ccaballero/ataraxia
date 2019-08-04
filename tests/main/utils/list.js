require('should');

const list=require('../../../src/main/utils/list')
  , config=require('../../../config');

describe('list',()=>{
    it('case 1',(done)=>{
        list({
            filepath:config.testcase.folder+config.testcase.books[0]
        })
        .then((args)=>{
            args.list.length.should.be.eql(188);

            done();
        });
    });

    it('case 2',(done)=>{
        list({
            filepath:config.testcase.folder+config.testcase.books[1]
        })
        .then((args)=>{
            args.list.length.should.be.eql(134);

            done();
        });
    });
});

