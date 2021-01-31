const request = require('request-promise');

const main=async(url)=>{
    
    let data;
    const response = await request({
        uri: url,
        headers:{
            "Accept": 
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-US,en;q=0.5",
            "Connection": "keep-alive",

        },
        gzip: true,
        json: true,
    })
    
    return response;
}
exports.main = main;