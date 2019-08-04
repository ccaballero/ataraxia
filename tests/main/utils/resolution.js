require('should');

const fs=require('fs')
  , path=require('path')
  , extract=require('../../../src/main/utils/extract')
  , list=require('../../../src/main/utils/list')
  , resolution=require('../../../src/main/utils/resolution')
  , config=require('../../../config');

describe('resolution',()=>{
    it('case 1',(done)=>{
        list({
            filepath:config.testcase.folder+config.testcase.books[0]
        })
        .then((args)=>{
            return extract({
                ...args
              , ...{
                    item:args.list[0]
                }
            });
        })
        .then(resolution)
        .then((args)=>{
            args.should.have.property('width').and.be.eql(899);
            args.should.have.property('height').and.be.eql(1300);

            fs.unlink(path.resolve(config.pages,args.hash),()=>{
                done();
            });
        });
    });

    it('case 2',(done)=>{
        list({
            filepath:config.testcase.folder+config.testcase.books[1]
        })
        .then((args)=>{
            return extract({
                ...args
              , ...{
                    item:args.list[0]
                }
            });
        })
        .then(resolution)
        .then((args)=>{
            args.should.have.property('width').and.be.eql(1160);
            args.should.have.property('height').and.be.eql(826);

            fs.unlink(path.resolve(config.pages,args.hash),()=>{
                done();
            });
        });
    });
});

