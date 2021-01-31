// const { response, request } = require('express');
const fnoData = require('./fnoData');
const express = require('express');
const Datastore = require('nedb');
const { get } = require('request-promise');
const app = express();
const port = 5000;

const url = "https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY";

app.use(express.json());

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/getData', (req, res)=>{
    database.find({}, (err, data)=>{
        console.log(data);
        res.json(data);
        console.log('sent');
    })
})

app.post('/postData', (req, res)=>{
    console.log(req.body);
})

app.listen(port, (req, res)=>{
    console.log(`Running Server on ${port}`);
    getData();
    //setInterval(getData, 5000);
})



function getData(){
fnoData.main(url).then((data)=>{

    let temp = data.filtered;
    temp.time = (new Date()).toLocaleString('en-us',{hour:'numeric', minute: 'numeric', second: 'numeric'});
    database.insert(temp);
    console.log('got Data');
}).catch((error)=>{
    console.log(error.message);
})
}
