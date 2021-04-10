import React from 'react'
import './SizeChart.css'
function SizeChart(props) {
    return (
        <div className='size-chart-container'>
            <button onClick={()=>props.handleCleanUp()} className='cancel-btn'><i className='fas fa-times'></i></button>
            <h1>Measurement Table</h1>
            <table>
                <tr>
                    <th>Area</th>
                    <th>Measure</th>
                </tr>
                <tr>
                    <td>Chest</td>
                    <td>{(46 + ((Math.random() * (2) ) - 1)).toFixed(2)}cm</td>
                </tr>
                <tr>
                    <td>Shoulder</td>
                    <td>{(47 + ((Math.random() * (2) ) -1 )).toFixed(2)}cm</td>
                </tr>
                <tr>
                    <td>Front length</td>
                    <td>{(60 + ((Math.random() * (2) ) -1 )).toFixed(2)}cm</td>
                </tr>
                <tr>
                    <td>Short seelve length</td>
                    <td>{(13 + ((Math.random() * (2) ) -1 )).toFixed(2)}cm</td>
                </tr>
                <tr>
                    <td>Long seelve length</td>
                    <td>{(52 + ((Math.random() * (2) ) -1 )).toFixed(2)}cm</td>
                </tr>
            </table>
        </div>
    )
}

export default SizeChart
