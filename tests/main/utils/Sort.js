require('should');

const List=require('../../../src/main/utils/List')
  , Sort=require('../../../src/main/utils/Sort')
  , config=require('../../../config');

describe('sort',()=>{
    it('case 1',(done)=>{
        List.list({
            filepath:config.testcase.folder+config.testcase.books[0]
        })
        .then(Sort.sort)
        .then((args)=>{
            args.list.length.should.be.eql(188);

            done();
        });
    });

    it('case 2',(done)=>{
        List.list({
            filepath:config.testcase.folder+config.testcase.books[1]
        })
        .then(Sort.sort)
        .then((args)=>{
            args.list.length.should.be.eql(134);

            done();
        });
    });
});

