import 'should';
import {join} from 'path';
import Exists from '../../../src/main/utils/Exists.js';
import configTest from '../../../tests/config/test.js';

describe('Exists',()=>{
    const config=configTest();

    it('Exists.js#1',async()=>{
        const args=await Exists.exists({
            filePath:join(config.folder,config.books[0])
        });

        args.should.have.property('check').and.be.eql(true);
    });

    it('Exists.js#2',async()=>{
        try{
            await Exists.exists({
                filePath:join(config.folder,'nofile')
            });
        }catch(error){
            error.message.should.be.eql('access_error');
        }
    });
});

