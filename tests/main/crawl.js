/*var request=require('request');

//request('https://myanimelist.net/login.php?from=%2F',function(error,response,body){
request('https://tmofans.com',function(error,response,body){
    console.log('error:',error);
    console.log('statusCode:',response&&response.statusCode);
    console.log('body:',body);
});
*/
 
var requestCloudflare=require('request-cloudflare');

requestCloudflare.request({
    method:'GET',
    url:'https://tmofans.co/library/manga/45/one-piece',
    encoding:null,              //=>utf8
    challengesToSolve:3,        // optional, if CF returns challenge after challenge, how many to solve before failing
    followAllRedirects:true     // mandatory for successful challenge solution
},(error,response,body)=>{
    console.log('=>',error,response,body);
});

