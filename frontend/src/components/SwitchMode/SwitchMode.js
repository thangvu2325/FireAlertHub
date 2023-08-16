import { useDispatch, useSelector } from 'react-redux';
import styles from './SwitchMode.module.scss';
import classNames from 'classnames/bind';
import { themeModeSelector } from '~/redux/selectors';
import { useRef } from 'react';
import { setThemeMode } from '~/redux/settingSlice';

const cx = classNames.bind(styles);
function SwitchMode({ isTabletOrMobile }) {
    // eslint-disable-next-line
    const ref = useRef();
    const dispatch = useDispatch();

    const themeMode = useSelector(themeModeSelector);
    const handleClick = () => {
        dispatch(setThemeMode(!themeMode));
    };
    let noHighlight = 'noHighlight';
    if (themeMode && ref.current) {
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
                            light: themeMode ? 'light' : '',
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
