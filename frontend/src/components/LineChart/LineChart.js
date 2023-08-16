import { memo } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import styles from './LineChart.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

Chart.register(CategoryScale);
// Hàm để tạo màu tương phản
function generateContrastingColor(baseLightness, index) {
    const hue = (index * 60) % 360; // Vary hue for distinct colors
    return `hsl(${hue}, 100%, ${baseLightness}%)`;
}
function LineChart({ dataValue = [], activeKey }) {
    const backgroundLightness = 80; // Độ sáng của màu nền (Lightness)
    const datasetsOption = [];
    dataValue.forEach((element, index) => {
        datasetsOption.push({
            label: element.node_name,
            data: element[activeKey]?.map((item) => item.y),
            fill: true,
            borderColor: generateContrastingColor(backgroundLightness, index),
        });
    });
    const labelData = dataValue[0]?.[activeKey]?.map((item) => item?.x);
    return (
        <div className={cx('wrap')}>
            <Line
                data={{
                    labels: labelData ?? [],
                    datasets: datasetsOption,
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
