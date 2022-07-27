import {access,constants} from 'fs/promises';

/*
 * input
 *      filepath
 *
 * output
 *      check
 */
class Exists{
    static async exists(args){
        try{
            await access(args.filepath,constants.R_OK);

            args.check=true;

            return args;
        }catch{
            throw new Error('access_error');
        }
    }
}

export default Exists;

