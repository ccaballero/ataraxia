import {spawn} from 'child_process';

/*
 * input
 *      filePath
 *
 * output
 *      list
 */
class List{
    static async list(args){
        const process=spawn('unrar',[
            'lt',
            args.filePath
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
            args.list=stdout
            .split('\n\n')
            .filter((i)=>{
                return /Type: File/.test(i);
            })
            .map((j)=>{
                return /Name: (.*)/.exec(j)[1];
            });

            return args;
        }else{
            console.log('ERROR: %s',stderr);

            throw new Error('list_error');
        }
    }
}

export default List;

