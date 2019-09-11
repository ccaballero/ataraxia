require('should');

const List=require('../../../src/main/utils/List')
  , config=require('../../../config');

describe('List',()=>{
    it('case 1',(done)=>{
        List.list({
            filepath:config.testcase.folder+config.testcase.books[0]
        })
        .then((args)=>{
            args.list.length.should.be.eql(188);

            done();
        });
    });

    it('case 2',(done)=>{
        List.list({
            filepath:config.testcase.folder+config.testcase.books[1]
        })
        .then((args)=>{
            args.list.length.should.be.eql(134);

            done();
        });
    });
});

