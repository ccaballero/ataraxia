require('should');

const fs=require('fs')
  , path=require('path')
  , extract=require('../../../src/main/utils/extract')
  , list=require('../../../src/main/utils/list')
  , config=require('../../../config');

describe('extract',()=>{
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
        .then((args)=>{
            args.should.have.property('hash')
                .and.be.String().and.not.empty();

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
        .then((args)=>{
            args.should.have.property('hash')
                .and.be.String().and.not.empty();

            fs.unlink(path.resolve(config.pages,args.hash),()=>{
                done();
            });
        });
    });
});

