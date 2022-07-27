import imagesize from 'image-size';
import {resolve} from 'path';

/*
 * input
 *      config
 *          pagesDir
 *      hash
 * output
 *      width
 *      height
 */
class Resolution{
    static async resolution(args){
        try{
            const dimensions=await imagesize(resolve(
                args.config.pagesDir,
                args.hash
            ));

            args.width=dimensions.width;
            args.height=dimensions.height;

            return args;
        }catch(error){
            throw new Error('resolution_error');
        }
    }
}

export default Resolution;

