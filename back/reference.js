const request = require('request-promise');

const url = "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY";

const main=async()=>{
    
    const response = await request({
        uri: url,
        headers:{
            Accept: 
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-US,en;q=0.5",
        },
        gzip: true,
        json: true,
    })
    console.log(typeof response);
    
}
main();

