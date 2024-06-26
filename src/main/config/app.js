import {join,resolve} from 'path';

export default ()=>{
    return {
        cacheDir:join(resolve(),'src','renderer','public','cache'),
        pagesDir:join(resolve(),'src','renderer','public','pages'),
        commands:{
            rar:'/opt/bin/unrar',
            sort:'/usr/bin/sort'
        }
    };
};

