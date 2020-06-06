import React, { useState, useEffect } from 'react';
import {fetchDailyData} from '../../api';
import {Line, Bar} from 'react-chartjs-2';

import styles from './Charts.module.css';

const Charts = ({ data, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const dData = await fetchDailyData();
            setDailyData(dData);
        }
        fetchAPI();
    },[]);

    //console.log("Dialysata",dailyData);

    const lineChart = (
        dailyData.length
        ?(
        <Line 
            data = {{
                labels : dailyData.map(({ date }) => date),
                datasets : [{
                    data : dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor : '#3333ff',
                    fill : true
                } , {
                    data : dailyData.map(({ deaths }) => deaths),
                    label : 'Deaths',
                    borderColor : 'red',
                    backgroundColor :  'rgba(255, 0, 0, 0.5)',
                    fill : true 
                }],
            }}
        />) : null
    );
    

    const barChart = (
        data.confirmed
        ? (
            <Bar
                data = {{
                    labels : ['Infected','Recovered','Deaths'],
                    datasets: [
                    { 
                        label : 'People',
                        backgroundColor : ['rgba(0,0,255,0.6)','rgba(0,255,0,0.6)','rgba(255,0,0,0.6)'],
                        data : [data.confirmed.value, data.recovered.value, data.deaths.value]
                     }
                ]
                }} 
                options = {{
                    legend: { display : false },
                    title : { display : true, text : `Current State in ${country}` }
                }}
            />
        ) : null
    );

    return(
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Charts;