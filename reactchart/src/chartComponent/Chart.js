import React from 'react';
import {Bar} from 'react-chartjs-3';
import 'chartjs-plugin-annotation';
 
export default class Chartjs extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            chartData:{
                labels: this.props.data[0],
                datasets: [{
                    data: this.props.data[1],
                    backgroundColor: 'rgba(48, 171, 68)',
            }]
            },
            annotation: undefined,
        }
    }


    click(){
        console.log(this.props.data);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data !== this.props.data){
            this.setState({
                chartData:{
                    labels: nextProps.data.strikes,
                    datasets: [{
                    label: 'Change in PE Open Intereset',
                    data: nextProps.data.peCOI,
                    backgroundColor: 'rgba(48, 171, 68)',
                },{
                    label: 'Change in CE Open Intereset',
                    data: nextProps.data.ceCOI,
                    backgroundColor: 'rgba(219, 57, 57)',
                }]
                },
                annotation:{
                    annotation: {
                        annotations: [{
                            borderColor: 'blue',
                            borderWidth: 1,
                            type: 'line',
                            value: 10,
                            scaleID: 'x-axis-0',
                      }]
                   },
                   maintainAspectRation: false
                }

            })
        }
    }

    render(){
    let option = this.props.data;

    let spot = option.spot? (<h1>Spot:{option.spot}</h1>): null;
    let pcr = option.peOI? (<h2>PCR:{(option.peOI.reduce((a, b)=>a+b)/option.ceOI.reduce((a, b)=>a+b)).toFixed(2)}</h2>):null;
    console.log('render');
    return(
        <div>
            <button onClick={()=>this.click()}>Console Props Data</button>
            {spot}{pcr}
            <Bar data={this.state.chartData} options={this.state.annotation}></Bar>
        </div>
    )
    }
}
