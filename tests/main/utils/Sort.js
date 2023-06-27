import 'should';
import {join} from 'path';
import List from '../../../src/main/utils/List.js';
import Sort from '../../../src/main/utils/Sort.js';
import configTest from '../../config/test.js';

describe('Sort',()=>{
    const config=configTest();

    it('Sort.js#1',async()=>{
        let args=await List.list({
            command:config.commands.rar,
            filePath:join(config.folder,config.books[0])
        });

        args.list.length.should.be.eql(18);

        args=await Sort.sort({
            ...args,
            command:config.commands.sort
        });

        args.list.length.should.be.eql(18);
    });

    it('Sort.js#1',async()=>{
        let args=await List.list({
            command:config.commands.rar,
            filePath:join(config.folder,config.books[1])
        });

        args.list.length.should.be.eql(187);

        args=await Sort.sort({
            ...args,
            command:config.commands.sort
        });

        args.list.length.should.be.eql(187);
    });
});

