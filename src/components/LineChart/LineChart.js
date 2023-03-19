import { Line } from 'react-chartjs-2';
import { ref, onValue } from 'firebase/database';
import { database } from '~/firebase_setup/firebase';
import { useState } from 'react';
function LineChart() {
    const [data, setData] = useState({});
    onValue(ref(database), (snapshot) => {
        setData(data);
    });
    console.log(data);
    return (
        <Line
            data={{
                labels: data.map((item) => item.x),
                datasets: [
                    {
                        label: 'Data',
                        data: data.map((item) => item.y),
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                    },
                ],
            }}
            options={{
                scales: {
                    xAxes: [
                        {
                            type: 'time',
                            time: {
                                unit: 'day',
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            }}
        />
    );
}

export default LineChart;
