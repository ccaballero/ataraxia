const join=require('path').join;

module.exports={
    cache:join(__dirname,'..','public','cache')
  , pages:join(__dirname,'..','public','pages')
  , testcase:{
        folder:'/home/jacobian/manga'
      , books:[
            '/_Tomo 13.cbr'
          , '/1990 - Tokyo Babylon/Tomo 01.cbr'
        ]
    }
};

