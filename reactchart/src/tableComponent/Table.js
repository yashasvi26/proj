import React from 'react';
import './Table.css'

export default class Table extends React.Component{
    renderTable(){
        if(this.props.data.peOI === undefined) return null;
        return this.props.data.peCOI.map((item, index)=>{
            return(
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{this.props.data.ceCOI[index]}</td>
                    <td>{item}</td>
                    <td>{this.props.data.ceCOI[index]-item}</td>
                </tr>
            )
        })
         
    }
    render(){

        return(
            <div id='div'>
                <table id='table'>
                    <tr>
                        <th>Time</th>
                        <th>Call Change In Open Interest</th>
                        <th>Put Change In Open Interest</th>
                        <th>Difference</th>
                    </tr>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>
            </div>
        )
    }
}