import 'should';
import {unlink} from 'fs/promises';
import {join,resolve} from 'path';
import Extract from '../../../src/main/utils/Extract.js';
import List from '../../../src/main/utils/List.js';
import Sort from '../../../src/main/utils/Sort.js';
import Resolution from '../../../src/main/utils/Resolution.js';
import configTest from '../../../config/test.js';

describe('Resolution',()=>{
    const config=configTest();

    it('Resolution.js#1',async()=>{
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

        args=await Resolution.resolution(args);

        args.should.have.property('width').and.be.eql(903);
        args.should.have.property('height').and.be.eql(1300);

        unlink(resolve(config.pagesDir,args.hash));
    });

    it('Resolution.js#2',async()=>{
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

        args=await Resolution.resolution(args);

        args.should.have.property('width').and.be.eql(900);
        args.should.have.property('height').and.be.eql(1280);

        unlink(resolve(config.pagesDir,args.hash));
    });
});

