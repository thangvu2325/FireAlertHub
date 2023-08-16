import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import classNames from 'classnames/bind';
import styles from './RoundChart.module.scss';
const cx = classNames.bind(styles);
function RoundChart({ className, ...props }) {
    return (
        <div className={cx('wrap')}>
            <CircularProgressbar
                value={props.value.value}
                text={`${Math.round((100 * props.value.value) / props.value.maxValue)}%`}
                maxValue={props.value.maxValue}
                className={className}
                styles={{
                    // Customize the root svg elkement
                    root: {},
                    // Customize the path, i.e. the "completed progress"
                    path: {
                        // Path color
                        stroke: `${
                            (100 * props.value.value) / props.value.maxValue > 70
                                ? '#f7406b'
                                : (100 * props.value.value) / props.value.maxValue > 50
                                ? '#e99613'
                                : '#3e98c7'
                        }`,
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
                        fill: `${
                            (100 * props.value.value) / props.value.maxValue > 70
                                ? '#f7406b'
                                : (100 * props.value.value) / props.value.maxValue > 50
                                ? '#e99613'
                                : '#3e98c7'
                        }`,
                        // Text size
                        fontSize: '16px',
                    },
                    // Customize background - only used when the `background` prop is true
                    // background: {
                    //     fill: '#fff',
                    // },
                }}
            />
        </div>
    );
}

export default RoundChart;
