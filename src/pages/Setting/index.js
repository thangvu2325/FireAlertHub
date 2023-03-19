import styles from './Setting.module.scss';
import classNames from 'classnames/bind';
import Leaflet from '~/components/Leaflet';
import Button from '~/components/Button';
import { useState, useRef } from 'react';

const cx = classNames.bind(styles);

function Setting() {
    const [mapOpen, setMapOpen] = useState(false);
    const [input, setInput] = useState('');
    const [locate, setLocate] = useState('');
    const handOpenMap = () => {
        setMapOpen(!mapOpen);
    };
    const callbackFunction = (childData) => {
        setLocate(childData);
    };
    const ref = useRef();
    return (
        <div className={cx('wrap')}>
            <div className={cx('action')}>
                <input
                    className={cx('input-locate')}
                    ref={ref}
                    value={locate || input}
                    name="locate"
                    placeholder="Nhập vị trí ở đây."
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                />
                <Button primary className={cx('btn')}>
                    Submit
                </Button>
                <Button primary onClick={handOpenMap} className={cx('btn')}>
                    Open Map
                </Button>
                <div className={cx('container')}>{mapOpen ? <Leaflet parentCallback={callbackFunction} /> : null}</div>
            </div>
        </div>
    );
}

export default Setting;
