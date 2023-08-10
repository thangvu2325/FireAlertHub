import { memo } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import styles from './LineChart.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

Chart.register(CategoryScale);
function LineChart({ dataValue }) {
    return (
        <div className={cx('wrap')}>
            <Line
                data={{
                    labels: dataValue?.map((item) => item.x),
                    datasets: [
                        {
                            label: 'Khói',
                            data: dataValue?.map((item) => item.y),
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
                    scales: {
                        x: {
                            display: false,
                        },
                    },
                }}
            />
        </div>
    );
}
export default memo(LineChart);
