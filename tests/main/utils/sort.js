require('should');

const list=require('../../../src/main/utils/list')
  , sort=require('../../../src/main/utils/sort')
  , config=require('../../../config');

describe('sort',()=>{
    it('case 1',(done)=>{
        list({
            filepath:config.testcase.folder+config.testcase.books[0]
        })
        .then(sort)
        .then((args)=>{
            args.list.length.should.be.eql(188);

            done();
        });
    });

    it('case 2',(done)=>{
        list({
            filepath:config.testcase.folder+config.testcase.books[1]
        })
        .then(sort)
        .then((args)=>{
            args.list.length.should.be.eql(134);

            done();
        });
    });
});

