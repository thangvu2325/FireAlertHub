import styles from './SwitchMode.module.scss';
import classNames from 'classnames/bind';
import { useContext, useRef } from 'react';
import { StateContext } from '~/App';

const cx = classNames.bind(styles);
function SwitchMode({isTabletOrMobile}) {
    // eslint-disable-next-line
    const styleState = useContext(StateContext);
    const ref = useRef();
    const setLocalStorage = (key, data) => {
        window.localStorage.setItem(key, data);
    };
    setLocalStorage('setStyle', styleState.style);
    const handleClick = () => {
        styleState.setStyle(!styleState.style);
    };
    let noHighlight = 'noHighlight';
    if (styleState.style && ref.current) {
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
                            light: styleState.style ? 'light' : '',
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
