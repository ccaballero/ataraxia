const join=require('path').join;

module.exports={
    cache:join(__dirname,'public','cache')
  , pages:join(__dirname,'public','pages')
  , testcase:{
        folder:'/home/jacobian/manga'
      , books:[
            '/1_Tomo 17.cbr'
          , '/1990 - Tokyo Babylon/Tomo 01.cbr'
        ]
    }
};

