import styles from './Setting.module.scss';
import classNames from 'classnames/bind';
import Leaflet from '~/components/Leaflet';
import Button from '~/components/Button';
import { useState, useRef } from 'react';
import AuthContext from '~/AuthContext';
import { useContext } from 'react';
import { StateContext } from '~/App';
import { useEffect } from 'react';
const cx = classNames.bind(styles);

function Setting() {
    const { currentUser } = useContext(AuthContext);
    const { data, admin } = useContext(StateContext);
    const [mapOpen, setMapOpen] = useState(false);
    const [input, setInput] = useState('');
    const [inputEmail, setInputEmail] = useState(currentUser.email);
    const [inputPhone, setInputPhone] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [locate, setLocate] = useState('');
    useEffect(() => {
        if (!!data.User_using && currentUser) {
            Object.entries(data.User_using).forEach((item) => {
                if (item[1].uid === currentUser.uid) {
                    setInput(item[1].locate);
                }
            });
        }
    }, [currentUser, data]);
    const handOpenMap = () => {
        setMapOpen(!mapOpen);
    };
    const callbackFunction = (childData) => {
        setLocate(childData);
    };
    const ref = useRef();
    return (
        <div className={cx('wrap')}>
            {admin ? null : (
                <div className={cx('container')}>
                    <div className={cx('action')}>
                        <span className={cx('content')}>
                            <h4 className={cx('title')}>Email:</h4>
                            <input
                                type="email"
                                className={cx('input-locate')}
                                ref={ref}
                                value={inputEmail}
                                name="email"
                                onChange={(e) => {
                                    setInputEmail(e.target.value);
                                }}
                                disabled
                            />
                        </span>
                    </div>
                    <div className={cx('action')}>
                        <span className={cx('content')}>
                            <h4 className={cx('title')}>Phone:</h4>
                            <input
                                type="number"
                                className={cx('input-locate')}
                                ref={ref}
                                value={inputPhone}
                                name="phone"
                                onChange={(e) => {
                                    setInputPhone(e.target.value);
                                }}
                                disabled
                            />
                        </span>
                    </div>
                    <div className={cx('action')}>
                        <span className={cx('content')}>
                            <h4 className={cx('title')}>Password:</h4>
                            <input
                                type="password"
                                className={cx('input-locate')}
                                ref={ref}
                                value={inputPassword}
                                name="password"
                                onChange={(e) => {
                                    setInputPassword(e.target.value);
                                }}
                                disabled
                            />
                        </span>
                    </div>
                    <div className={cx('action')}>
                        <span className={cx('content')}>
                            <h4 className={cx('title')}>Vị trí:</h4>
                            <input
                                className={cx('input-locate')}
                                ref={ref}
                                value={locate || input}
                                name="locate"
                                placeholder="Nhập vị trí ở đây."
                                onChange={(e) => {
                                    setInput(e.target.value);
                                }}
                                disabled
                            />
                        </span>
                        <div className={cx('container_map')}>
                            {mapOpen ? <Leaflet parentCallback={callbackFunction} /> : null}
                        </div>
                    </div>
                    <Button primary className={cx('btn')}>
                        Lưu
                    </Button>
                    <Button primary onClick={handOpenMap} className={cx('btn')}>
                        Open Map
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Setting;
