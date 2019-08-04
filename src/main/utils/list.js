const {spawn}=require('child_process');

/*
 * input
 *      filepath
 *
 * output
 *      list
 */
module.exports=(args)=>{
    return new Promise((resolve,reject)=>{
        const process=spawn('unrar',['lt',args.filepath]);

        let stdout=''
          , stderr='';

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

            args.list=stdout
                .split('\n\n')
                .filter((i)=>{
                    return /Type: File/.test(i);
                })
                .map((j)=>{
                    return /Name: (.*)/.exec(j)[1];
                });

            resolve(args);
        });
    });
};

