import {spawn} from 'child_process';
import {rename} from 'fs/promises';
import {extname,resolve} from 'path';
import {v4} from 'uuid';

/*
 * input
 *      config
 *          cacheDir
 *          pagesDir
 *      filePath
 *      item
 *
 * output
 *      hash
 */
class Extract{
    static async extract(args){
        const process=spawn('unrar',[
            'e',
            '-o+',
            args.filePath,       // source rar file
            args.item,           // file inside rar file
            args.config.cacheDir // folder to extract
        ]);

        let stdout='',
            stderr='';

        for await (const data of process.stdout){
            stdout+=data;
        }

        for await (const data of process.stderr){
            stderr+=data;
        }

        const code=await new Promise((resolve)=>{
            process.on('close',resolve);
        });

        if(code===0){
            const oldPath=/Extracting {2}(.*) {3}/
                .exec(stdout)[1].trim(),
                hash=v4()+extname(oldPath);

            console.log(
                '%s -> %s',
                oldPath,
                args.config.pagesDir,
                hash
            );

            await rename(
                oldPath,
                resolve(args.config.pagesDir,hash)
            );

            args.hash=hash;

            return args;
        }else{
            console.log('ERROR: %s',stderr);

            throw new Error('extract_error');
        }
    }
}

export default Extract;

