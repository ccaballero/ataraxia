import should from 'should';
import Store from '../../../src/main/store/Store.js';

describe('Store',()=>{
    const store=new Store();

    it('Store.js#1',async()=>{
        const value=60;

        store.set('foo',value);
        store.get('foo').should.be.eql(value);
    });

    it('Store.js#2',async()=>{
        const value=60;

        store.set('foo',value);
        store.delete('foo');
        should.not.exists(store.get('foo'));
    });
});

