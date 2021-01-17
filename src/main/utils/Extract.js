const {spawn}=require('child_process')
  , fs=require('fs')
  , path=require('path')
  , {v4:uuidv4}=require('uuid');

/*
 * input
 *      config
 *          cache
 *          pages
 *      filepath
 *      item
 *
 * output
 *      hash
 */
class Extract {
    static extract(args){
        return new Promise((resolve,reject)=>{
            const process=spawn('unrar',[
                'e','-o+',args.filepath,args.item,args.config.cache]);

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

                let old_path=/Extracting  (.*)   /.exec(stdout)[1].trim()
                  , hash=uuidv4()+path.extname(old_path);

                fs.rename(old_path,path.resolve(args.config.pages,hash),
                    (error)=>{
                    if(error){
                        reject(error);
                        return;
                    }

                    args.hash=hash;
                    resolve(args);
                });
            });
        });
    }
}

module.exports=Extract;

