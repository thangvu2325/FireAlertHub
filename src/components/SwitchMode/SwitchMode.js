import styles from './SwitchMode.module.scss';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
const cx = classNames.bind(styles);
function SwitchMode() {
    const [isChecked, setIsChecked] = useState(false);
    const ref = useRef();
    const handleClick = () => {
        setIsChecked(!isChecked);
    };
    let noHighlight = 'noHighlight';
    if (isChecked && ref.current) {
        ref.current.style.left = '10px';
    } else if (ref.current) {
        ref.current.style.left = '-10px';
    }

    return (
        <div className={cx('btnContainer')} onClick={handleClick}>
            <div
                className={cx('btn', {
                    noHighlight,
                })}
            >
                <div
                    className={cx('knob', {
                        noHighlight,
                    })}
                    ref={ref}
                >
                    <div
                        className={cx({
                            noHighlight,
                            light: isChecked ? 'light' : '',
                        })}
                    ></div>
                    <div
                        className={cx('top', {
                            noHighlight,
                        })}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default SwitchMode;
