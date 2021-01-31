import React from 'react';
import Chartjs from './chartComponent/Chart.js';
import Table from './tableComponent/Table.js'
import axios from 'axios';
import './App.css';

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      data:{
      strikes: undefined,
      peCOI: undefined,
      ceCOI: undefined,
      spot: undefined,
      peOI: undefined,
      ceOI: undefined,
      i: undefined,
      },
    }
  }

  send(){
    console.log('sending');

    const data = {data:'this is React!!!'};

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }
    axios.post('/postData', data, options);
  }

  componentDidMount(){

    axios.get('/getData').then((response)=>{
      console.log(response)
      let chain = response.data[0];
      let spot = chain.data[0].PE.underlyingValue;
      let i;
      let strikes = [];

      chain.data.forEach(function(item, index) {
        if(i === undefined && item.strikePrice > spot){
          console.log('Spot:'+item.strikePrice);
          i = index;    
        }
        strikes.push(item.strikePrice);
      });

      let peCOI = chain.data.map(val=>val.PE.changeinOpenInterest*75);
      let ceCOI = chain.data.map(val=>val.CE.changeinOpenInterest*75);
      let peOI = chain.data.map(val=>val.PE.openInterest*75);
      let ceOI = chain.data.map(val=>val.CE.openInterest*75);

      console.log(peOI);
      strikes = strikes.slice(i-10, i+11);
      peCOI = peCOI.slice(i-10, i+11);
      ceCOI = ceCOI.slice(i-10, i+11);
      peOI = peOI.slice(i-10, i+11);
      ceOI = ceOI.slice(i-10, i+11);



      let data = {strikes: strikes, peCOI: peCOI, ceCOI: ceCOI, spot: spot, peOI: peOI, ceOI: ceOI};
      this.setState({
        data: data,
      })
    
    })
  }

  render(){
  return (
    <div className="App">
      <button onClick={()=>this.send()}>Send to Server</button>
      <Chartjs data={this.state.data}/>
      <div className="table">
        <Table data={this.state.data}/>
      </div>
    </div>
  )
  }
}
