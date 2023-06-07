import { useEffect, useState, memo } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import styles from './LineChart.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

Chart.register(CategoryScale);

function LineChart(dataValue) {
    const [data, setData] = useState([]);
    // Counter state for new data points
    const [count, setCount] = useState(0);

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
                            label: 'Khói',
                            data: data.map((item) => item.y),
                            fill: true,
                            borderColor: '#5174D4',
                        },
                    ],
                }}
                className={cx('line-chart')}
                options={{
                    animation: {
                        duration: 0, // tắt animation của biểu đồ
                    },
                }}
                
            />
    );
}
export default memo(LineChart);
