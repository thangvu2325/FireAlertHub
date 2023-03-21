import { useEffect, useState, memo } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

function LineChart(dataValue) {
    const [data, setData] = useState([]);
    // Counter state for new data points
    const [count, setCount] = useState(0);
    console.log(data);
    // const writeData = () => {
    //     set(ref(database, 'User_using/data'), {
    //         data: JSON.stringify(data),
    //     });
    // };
    // writeData();

    useEffect(() => {
        const formattedData = {
            x: new Date().toLocaleTimeString(),
            y: dataValue.dataValue,
        };
        // Add new data point to existing data
        setData((prevData) => [...prevData, formattedData]);

        // Increment the data point counter
        setCount(count + 1);
        // If more than 20 data points, remove the oldest data point
        if (count >= 20) {
            setData((prevData) => prevData.slice(1));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataValue.dataValue]);

    return (
        <Line
            data={{
                labels: data.map((item) => item.x),
                datasets: [
                    {
                        label: 'Value',
                        data: data.map((item) => item.y),
                        fill: false,
                        borderColor: '#5174D4',
                    },
                ],
            }}
            options={{
                animation: {
                    duration: 0, // tắt animation của biểu đồ
                },
            }}
        />
    );
}
export default memo(LineChart);
