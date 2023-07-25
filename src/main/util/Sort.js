import {spawn} from 'child_process';

/*
 * input
 *      command
 *      list
 *
 * output
 *      list
 */
class Sort{
    static async sort(args){
        const process=spawn(args.command,[
            '-V'
        ]);

        let stdout='',
            stderr='';

        process.stdin.write(args.list.join('\n'));
        process.stdin.end();

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
            args.list=stdout.trim().split('\n');

            return args;
        }else{
            console.log('ERROR: %s',stderr);

            throw new Error('sort_error');
        }
    }
}

export default Sort;

