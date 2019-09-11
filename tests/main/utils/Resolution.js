require('should');

const fs=require('fs')
  , path=require('path')
  , Extract=require('../../../src/main/utils/Extract')
  , List=require('../../../src/main/utils/List')
  , Resolution=require('../../../src/main/utils/Resolution')
  , config=require('../../../config');

describe('resolution',()=>{
    it('case 1',(done)=>{
        List.list({
            filepath:config.testcase.folder+config.testcase.books[0]
        })
        .then((args)=>{
            return Extract.extract({
                ...args
              , ...{
                    item:args.list[0]
                }
            });
        })
        .then(Resolution.resolution)
        .then((args)=>{
            args.should.have.property('width').and.be.eql(899);
            args.should.have.property('height').and.be.eql(1300);

            fs.unlink(path.resolve(config.pages,args.hash),()=>{
                done();
            });
        });
    });

    it('case 2',(done)=>{
        List.list({
            filepath:config.testcase.folder+config.testcase.books[1]
        })
        .then((args)=>{
            return Extract.extract({
                ...args
              , ...{
                    item:args.list[0]
                }
            });
        })
        .then(Resolution.resolution)
        .then((args)=>{
            args.should.have.property('width').and.be.eql(1160);
            args.should.have.property('height').and.be.eql(826);

            fs.unlink(path.resolve(config.pages,args.hash),()=>{
                done();
            });
        });
    });
});

