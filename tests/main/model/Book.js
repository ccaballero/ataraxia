import should from 'should';
import {join} from 'path';
import Book from '../../../src/main/model/Book.js';
import Store from '../../../src/main/store/Store.js';
import configTest from '../../config/test.js';

describe('Book',()=>{
    const config=configTest(),
        store=new Store();

    store.set('commands.rar',config.commands.rar);
    store.set('commands.sort',config.commands.sort);

    const book=new Book(store,config.cacheDir,config.pagesDir);

    it('Book.js#load',async()=>{
        book.filePath=join(config.folder,config.books[0]);

        await book.load();

        book.current.should.be.eql(0);
        book.total.should.be.eql(16);

        book
        .pages
        .forEach((page,i)=>{
            page.should.have.property('index').and.be.eql(i);
            page.should.have.property('name').and.be.String();
        });
    });

    it('Book.js#map',async()=>{
        await book.map();

        book
        .pages
        .forEach((page,i)=>{
            console.log(page.toString());

            page.should.have.property('index').and.be.eql(i);
            page.should.have.property('name').and.be.String();
            page.should.have.property('hash').and.be.String();
            page.should.have.property('width').and.be.Number();
            page.should.have.property('height').and.be.Number();
        });
    });

    it('Book.js#index',async()=>{
        book.index();

        book
        .dpages
        .forEach((dpage)=>{
            let sum='';

            dpage
            .forEach((page)=>{
                sum+=page.toString();
            });

            console.log(sum);
        });
    });

    it('Book.js#close',async()=>{
        await book.close();

        should.not.exists(book.filePath);
        book.pages.should.be.Array().and.be.length(0);
        book.current.should.be.eql(-1);
    });
});

