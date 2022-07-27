import 'should';
import {unlink} from 'fs/promises';
import {join,resolve} from 'path';
import Extract from '../../../src/main/utils/Extract.js';
import List from '../../../src/main/utils/List.js';
import Sort from '../../../src/main/utils/Sort.js';
import configTest from '../../../config/test.js';

describe('Extract',()=>{
    const config=configTest();

    it('Extract.js#1',async()=>{
        let args=await List.list({
            filepath:join(config.folder,config.books[0])
        });

        args=await Sort.sort(args);
        args=await Extract.extract({
            config:{
                cacheDir:config.cacheDir,
                pagesDir:config.pagesDir
            },
            filepath:args.filepath,
            item:args.list[0]
        });

        args.should.have.property('hash')
        .and.be.String().and.not.empty();

        unlink(resolve(config.pagesDir,args.hash));
    });

    it('Extract.js#2',async()=>{
        let args=await List.list({
            filepath:join(config.folder,config.books[1])
        });

        args=await Sort.sort(args);
        args=await Extract.extract({
            config:{
                cacheDir:config.cacheDir,
                pagesDir:config.pagesDir
            },
            filepath:args.filepath,
            item:args.list[0]
        });

        args.should.have.property('hash')
        .and.be.String().and.not.empty();

        unlink(resolve(config.pagesDir,args.hash));
    });
});

