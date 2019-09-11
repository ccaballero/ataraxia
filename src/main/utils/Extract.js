const {spawn}=require('child_process')
  , fs=require('fs')
  , path=require('path')
  , uuidv4=require('uuid/v4')
  , config=require('../../../config');

/*
 * input
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
                'e','-o+',args.filepath,args.item,config.cache]);

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

                fs.rename(old_path,path.resolve(config.pages,hash),(error)=>{
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

