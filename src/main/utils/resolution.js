const imagesize=require('image-size')
  , path=require('path')
  , config=require('../../../config');

/*
 * input
 *      hash
 * output
 *      width
 *      height
 */
module.exports=(args)=>{
    return new Promise((resolve,reject)=>{
        imagesize(path.resolve(config.pages,args.hash),(error,dimensions)=>{
            if(error){
                reject(error);
                return;
            }

            args.width=dimensions.width;
            args.height=dimensions.height;
            resolve(args);
        });
    });
};

