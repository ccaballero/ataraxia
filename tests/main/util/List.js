import 'should';
import {join} from 'path';
import List from '../../../src/main/util/List.js';
import configTest from '../../config/test.js';

describe('List',()=>{
    const config=configTest();

    it('List.js#1',async()=>{
        const args=await List.list({
            command:config.commands.rar,
            filePath:join(config.folder,config.books[0])
        });

        args.list.length.should.be.eql(18);
    });

    it('List.js#2',async()=>{
        const args=await List.list({
            command:config.commands.rar,
            filePath:join(config.folder,config.books[1])
        });

        args.list.length.should.be.eql(187);
    });
});

