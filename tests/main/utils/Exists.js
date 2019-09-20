require('should');

const Exists=require('../../../src/main/utils/Exists')
  , config=require('../../config');

describe('Exists',()=>{
    it('positive case',(done)=>{
        Exists.exists({
            filepath:config.testcase.folder+config.testcase.books[0]
        })
        .then((args)=>{
            args.should.have.property('check').and.be.eql(true);
            done();
        });
    });

    it('negative case',(done)=>{
        Exists.exists({
            filepath:config.testcase.folder+'/nofile'
        })
        .catch((error)=>{
            console.log(error);
            done();
        });
    });
});

