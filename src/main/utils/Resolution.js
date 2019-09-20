const imagesize=require('image-size')
  , path=require('path');

/*
 * input
 *      config
 *          pages
 *      hash
 * output
 *      width
 *      height
 */
class Resolution {
    static resolution(args){
        return new Promise((resolve,reject)=>{
            imagesize(path.resolve(args.config.pages,args.hash),
                (error,dimensions)=>{
                if(error){
                    reject(error);
                    return;
                }

                args.width=dimensions.width;
                args.height=dimensions.height;
                resolve(args);
            });
        });
    }
}

module.exports=Resolution;

