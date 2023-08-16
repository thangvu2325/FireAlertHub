import styles from './MyAccount.module.scss';
import classNames from 'classnames/bind';
import Leaflet from '~/components/Leaflet';
import Button from '~/components/Button';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { adminSelector, currentUserSelector } from '~/redux/selectors';
const cx = classNames.bind(styles);

function MyAccount() {
    const currentUser = useSelector(currentUserSelector);
    const [mapOpen, setMapOpen] = useState(false);
    const [inputEmail, setInputEmail] = useState(currentUser._doc.email);
    const [inputPhone, setInputPhone] = useState(currentUser._doc.phone);
    const [inputPassword, setInputPassword] = useState('*******');
    const [locate, setLocate] = useState(currentUser._doc.location);
    const admin = useSelector(adminSelector);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const handOpenMap = () => {
        setMapOpen(!mapOpen);
    };
    const callbackFunction = (childData) => {
        setLocate(childData);
    };
    const ref = useRef();
    return (
        <div className={cx('wrap')}>
            <div className={cx('heading')}>
                <h1 className={cx('title')}>USER PROFILE</h1>
            </div>
            {admin !== 'user' ? null : (
                <div
                    className={cx('container', {
                        isDesktop: true,
                    })}
                >
                    <div className={cx('content')}>
                        <div className={cx('action')}>
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
                            <Button className={cx('btn-change')} outline>
                                Change
                            </Button>
                        </div>
                        <div className={cx('action')}>
                            <h4 className={cx('title')}>Phone:</h4>
                            <input
                                type="string"
                                className={cx('input-locate')}
                                ref={ref}
                                value={inputPhone}
                                name="phone"
                                onChange={(e) => {
                                    setInputPhone(e.target.value);
                                }}
                                disabled
                            />
                            <Button className={cx('btn-change')} outline>
                                Change
                            </Button>
                        </div>
                        <div className={cx('action')}>
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
                            <Button className={cx('btn-change')} outline>
                                Change
                            </Button>
                        </div>
                        <div className={cx('action')}>
                            <h4 className={cx('title')}>Vị trí:</h4>
                            <input
                                className={cx('input-locate')}
                                ref={ref}
                                value={locate}
                                name="locate"
                                placeholder="Nhập vị trí ở đây."
                                onChange={(e) => {
                                    setLocate(e.target.value);
                                }}
                                disabled
                            />
                            <Button outline onClick={handOpenMap} className={cx('btn-change')}>
                                Map
                            </Button>
                            {/* <Button className={cx('btn-change')} outline>Change</Button> */}
                        </div>
                        <span className={cx('action-btn')}>
                            <Button outline onClick={handOpenMap} className={cx('btn')}>
                                Map
                            </Button>
                            <Button primary className={cx('btn')}>
                                Lưu
                            </Button>
                        </span>

                        {false ? (
                            <div className={cx('container_map')}>
                                <Leaflet locate={locate} parentCallback={callbackFunction} onClose={handOpenMap} />
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyAccount;
