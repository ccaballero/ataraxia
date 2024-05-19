import 'should';
import {unlink} from 'fs/promises';
import {join,resolve} from 'path';
import Extract from '../../../src/main/util/Extract.js';
import List from '../../../src/main/util/List.js';
import Sort from '../../../src/main/util/Sort.js';
import Resolution from '../../../src/main/util/Resolution.js';
import configTest from '../../config/test.js';

describe('Resolution',()=>{
    const config=configTest();

    it('Resolution.js#1',async()=>{
        let args=await List.list({
            command:config.commands.rar,
            filePath:join(config.folder,config.books[0])
        });

        args=await Sort.sort({
            ...args,
            command:config.commands.sort
        });
        args=await Extract.extract({
            command:config.commands.rar,
            config:{
                cacheDir:config.cacheDir,
                pagesDir:config.pagesDir
            },
            filePath:args.filePath,
            item:args.list[0]
        });

        args=await Resolution.resolution(args);

        args.should.have.property('width').and.be.eql(2200);
        args.should.have.property('height').and.be.eql(1606);

        unlink(resolve(config.pagesDir,args.hash));
    });

    it('Resolution.js#2',async()=>{
        let args=await List.list({
            command:config.commands.rar,
            filePath:join(config.folder,config.books[1])
        });

        args=await Sort.sort({
            ...args,
            command:config.commands.sort
        });
        args=await Extract.extract({
            command:config.commands.rar,
            config:{
                cacheDir:config.cacheDir,
                pagesDir:config.pagesDir
            },
            filePath:args.filePath,
            item:args.list[0]
        });

        args=await Resolution.resolution(args);

        args.should.have.property('width').and.be.eql(843);
        args.should.have.property('height').and.be.eql(1199);

        unlink(resolve(config.pagesDir,args.hash));
    });
});

