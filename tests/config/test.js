import {join,resolve} from 'path';

export default ()=>{
    return {
        cacheDir:join(resolve(),'src','renderer','public','cache'),
        pagesDir:join(resolve(),'src','renderer','public','pages'),
        commands:{
            rar:'/opt/bin/unrar',
            sort:'/usr/bin/sort'
        },
        folder:'/home/jacobian/Documentos/Mangas',
        books:[
            'waiting/1997 - One Piece_/1101.cbr',
            'read/2015 - Maou no Hajimekata: The Comic/Tomo 01.cbr',
            'read/2004 - Minami-ke/Tomo 01.cbr'
        ]
    };
};

