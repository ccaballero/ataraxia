import {access,constants} from 'fs/promises';

/*
 * input
 *      filePath
 *
 * output
 *      check
 */
class Exists{
    static async exists(args){
        try{
            await access(args.filePath,constants.R_OK);

            args.check=true;

            return args;
        }catch{
            throw new Error('access_error');
        }
    }
}

export default Exists;

