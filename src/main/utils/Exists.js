const fs=require('fs');

/*
 * input
 *      filepath
 *
 * output
 *      check
 */
class Exists {
    static exists(args){
        return new Promise((resolve,reject)=>{
            fs.access(args.filepath,fs.constants.R_OK,(error)=>{
                if(error){
                    reject(error);
                    return;
                }

                args.check=true;
                resolve(args);
            });
        });
    }
}

module.exports=Exists;

