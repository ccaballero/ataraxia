import {join,resolve} from 'path';

export default ()=>{
    return {
        cacheDir:join(resolve(),'public','cache'),
        pagesDir:join(resolve(),'public','pages'),
        folder:'/home/jacobian/Documentos/Mangas',
        books:[
            'waiting/1997 - One Piece_/1036.cbr',
            'read/2011 - Terra Formars_/Tomo 12.cbr',
            'read/2004 - Minami-ke/Tomo 01.cbr'
        ]
    };
};

