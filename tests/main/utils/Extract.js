require('should');

const fs=require('fs')
  , path=require('path')
  , Extract=require('../../../src/main/utils/Extract')
  , List=require('../../../src/main/utils/List')
  , config=require('../../config');

describe('Extract',()=>{
    it('case 1',(done)=>{
        List.list({
            filepath:config.testcase.folder+config.testcase.books[0]
        })
        .then((args)=>{
            return Extract.extract({
                ...args
              , ...{
                    config:{
                        cache:config.cache
                      , pages:config.pages
                    }
                  , item:args.list[0]
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
        List.list({
            filepath:config.testcase.folder+config.testcase.books[1]
        })
        .then((args)=>{
            return Extract.extract({
                ...args
              , ...{
                    config:{
                        cache:config.cache
                      , pages:config.pages
                    }
                  , item:args.list[0]
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

