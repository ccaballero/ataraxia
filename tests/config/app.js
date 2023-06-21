import {join,resolve} from 'path';

export default ()=>{
    return {
        cacheDir:join(resolve(),'resources','cache'),
        pagesDir:join(resolve(),'resources','pages'),
        folder:'/home/jacobian/Documentos/Mangas',
        books:[
            'waiting/1997 - One Piece_/1056.cbr',
            'read/2015 - Maou no Hajimekata: The Comic/Tomo 01.cbr',
            'read/2004 - Minami-ke/Tomo 01.cbr'
        ]
    };
};

