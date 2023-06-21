import 'should';
import {join} from 'path';
import List from '../../../src/main/utils/List.js';
import Sort from '../../../src/main/utils/Sort.js';
import configTest from '../../../tests/config/app.js';

describe('Sort',()=>{
    const config=configTest();

    it('Sort.js#1',async()=>{
        let args=await List.list({
            filepath:join(config.folder,config.books[0])
        });

        args=await Sort.sort(args);

        args.list.length.should.be.eql(18);
    });

    it('Sort.js#1',async()=>{
        let args=await List.list({
            filepath:join(config.folder,config.books[1])
        });

        args=await Sort.sort(args);

        args.list.length.should.be.eql(187);
    });
});

