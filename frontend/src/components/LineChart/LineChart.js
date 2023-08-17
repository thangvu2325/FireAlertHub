import { memo } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import styles from './LineChart.module.scss';
import classNames from 'classnames/bind';
import { format } from 'date-fns';
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
                        display: true, // Hiển thị trục x
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 3, // Số lượng mốc thời gian tối đa hiển thị
                            callback: (value, index, values) => {
                                // Chuyển đổi chuỗi số thành ngày tháng và định dạng
                                const date = new Date(parseInt(value)); // Chuyển chuỗi số thành đối tượng Date
                                return format(date, 'dd/MM/yyyy'); // Định dạng ngày tháng
                            },
                            // Thêm phần cấu hình để nhãn trục x nằm ngang
                            maxRotation: 0,
                            minRotation: 0,
                        },
                    },
                },
                elements: {
                    point: {
                        radius: 0, // Ẩn các dot biểu thị giá trị
                    },
                },
            }}
        />
    );
}
export default memo(LineChart);
