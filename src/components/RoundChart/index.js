import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function RoundChart({ value, maxValue, className }) {
    const percent = (100 * value) / maxValue;
    var colorText = '#3e98c7';
    if (percent >= 70) {
        colorText = '#f7406b';
    } else if (percent > 50 && percent < 70) {
        colorText = '#e99613';
    }
    return (
        <CircularProgressbar
            value={value}
            text={`${(100 * value) / maxValue}%`}
            maxValue={maxValue}
            className={className}
            styles={{
                // Customize the root svg elkement
                root: {},
                // Customize the path, i.e. the "completed progress"
                path: {
                    // Path color
                    stroke: `${colorText}`,
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'butt',
                    // Customize transition animation
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                    // Rotate the path
                    transform: 'rotate(0.25turn)',
                    transformOrigin: 'center center',
                },
                // Customize the circle behind the path, i.e. the "total progress"
                trail: {
                    // Trail color
                    stroke: '#d6d6d6',
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'butt',
                    // Rotate the trail
                    transform: 'rotate(0.25turn)',
                    transformOrigin: 'center center',
                },
                // Customize the text
                text: {
                    // Text color
                    fill: `${colorText}`,
                    // Text size
                    fontSize: '16px',
                },
                // Customize background - only used when the `background` prop is true
                background: {
                    fill: '#3e98c7',
                },
            }}
        />
    );
}

export default RoundChart;
