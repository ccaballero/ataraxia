require('should');

const exists=require('../../../src/main/utils/exists')
  , config=require('../../../config');

describe('exists',()=>{
    it('positive case',(done)=>{
        exists({
            filepath:config.testcase.folder+config.testcase.books[0]
        })
        .then((args)=>{
            args.should.have.property('check').and.be.eql(true);
            done();
        });
    });

    it('negative case',(done)=>{
        exists({
            filepath:config.testcase.folder+'/nofile'
        })
        .catch((error)=>{
            console.log(error);
            done();
        });
    });
});

