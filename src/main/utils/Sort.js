const {spawn}=require('child_process');

/*
 * input
 *      list
 *
 * output
 *      list
 */
class Sort {
    static sort(args){
        return new Promise((resolve,reject)=>{
            const process=spawn('sort',['-V']);

            let stdout=''
              , stderr='';

            process.stdin.write(args.list.join('\n'));
            process.stdin.end();

            process.stdout.on('data',(data)=>{
                stdout+=data;
            });

            process.stderr.on('data',(data)=>{
                stderr+=data;
            });

            process.on('close',(code)=>{
                if(code!=0){
                    reject(new Error(stderr));
                    return;
                }

                args.list=stdout.trim().split('\n');

                resolve(args);
            });
        });
    }
}

module.exports=Sort;

