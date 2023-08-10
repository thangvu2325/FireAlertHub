/* eslint-disable no-sequences */
import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import { useState } from 'react';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import Leaflet from '~/components/Leaflet';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
import { registerUser } from '~/redux/apiRequest';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [locate, setLocate] = useState('');
    const [gateway, setGateway] = useState('');
    const [openMap, setOpenMap] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [password2Error, setPassword2Error] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [gatewayError, setGatewayError] = useState('');

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const handleClick = () => {
        handleMap();
    };
    const isRequired = (textCheck) => {
        if (textCheck === '') {
            return 'Trường này là bắt buộc!!';
        }
    };

    const handlePasswordChange = () => {
        if (isRequired(password)) {
            setPasswordError(isRequired(password));
        } else if (password.length < 8) {
            setPasswordError('Mật khẩu phải có ít nhất 8 ký tự');
        } else {
            setPasswordError('');
        }
    };
    const handlePassword2Check = () => {
        if (isRequired(password2)) {
            setPassword2Error(isRequired(password2));
        } else if (password2.length < 8) {
            setPassword2Error('Mật khẩu nhập lại phải có ít nhất 8 ký tự');
        } else if (password !== password2) {
            setPassword2Error('Nhập lại mật khẩu không chính xác!');
        } else {
            setPassword2Error('');
        }
    };
    const handleLocationCheck = () => {
        if (isRequired(locate)) {
            setLocationError(isRequired(locate));
        } else {
            setLocationError('');
        }
    };

    const handlePhoneChange = (e) => {
        if (isRequired(phoneNumber)) {
            setPhoneError(isRequired(phoneNumber));
        } else if (!/^[0-9]{10}$/.test(phoneNumber)) {
            setPhoneError('Số điện thoại không hợp lệ');
        } else {
            setPhoneError('');
        }
    };
    const handleEmailChange = () => {
        if (isRequired(email)) {
            setEmailError(isRequired(email));
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Email không hợp lệ');
        } else {
            setEmailError('');
        }
    };
    const handleGatewayChange = () => {
        if (isRequired(gateway)) {
            setGatewayError(isRequired(gateway));
        } else {
            setGatewayError('');
        }
    };
    const callbackFunction = (childData) => {
        setLocate(childData);
    };
    const handleRegister = (email, password, phoneNumber, locate, gateway) => {
        const newUser = {
            email: email,
            password: password,
            phone: phoneNumber,
            location: locate,
            gateway: gateway,
        };

        if (registerUser(newUser, dispatch, navigate, toast)) {
            setEmail('');
            setPassword('');
            setPassword2('');
            setPhone('');
            setLocate('');
            setGateway('');
        }
    };
    const handleSignup = () => {
        handlePasswordChange();
        handlePassword2Check();
        handleLocationCheck();
        handlePhoneChange();
        handleEmailChange();
        handleGatewayChange();
        if (passwordError || password2Error || phoneError || emailError || locationError || gatewayError) {
            return;
        } else {
            handleRegister(email, password, phoneNumber, locate, gateway);
        }
    };
    const handleMap = () => {
        setOpenMap(!openMap);
    };
    return (
        <>
            <div className={cx('wrap')}>
                <div
                    className={cx('container', {
                        isDesktop: !isTabletOrMobile,
                    })}
                >
                    <h2
                        className={cx('title', {
                            user_sellect: true,
                        })}
                    >
                        Sign Up
                    </h2>
                    <div className={cx('content')}>
                        <div className={cx('form')}>
                            <input
                                className={cx('input')}
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Your Email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={handleEmailChange}
                            />
                            {emailError ? <p className={cx('error-message')}>{emailError}</p> : ''}

                            <input
                                className={cx('input')}
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Your Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={handlePasswordChange}
                            />
                            {passwordError ? <p className={cx('error-message')}>{passwordError}</p> : ''}

                            <input
                                className={cx('input')}
                                type="password"
                                name="password"
                                value={password2}
                                placeholder="Your Password again"
                                required
                                onChange={(e) => setPassword2(e.target.value)}
                                onBlur={handlePassword2Check}
                            />
                            {password2Error ? <p className={cx('error-message')}>{password2Error}</p> : ''}

                            <input
                                className={cx('input')}
                                type="text"
                                name="phone"
                                value={phoneNumber}
                                placeholder="Nhập Phone:"
                                required
                                onChange={(e) => setPhone(e.target.value)}
                                onBlur={handlePhoneChange}
                            />
                            {phoneError ? <p className={cx('error-message')}>{phoneError}</p> : ''}

                            <input
                                className={cx('input')}
                                type="text"
                                name="locate"
                                value={locate}
                                placeholder="Nhập vị trí:"
                                required
                                onChange={(e) => setLocate(e.target.value)}
                                disabled
                            />
                            {locationError ? <p className={cx('error-message')}>{locationError}</p> : ''}
                            <input
                                className={cx('input')}
                                type="text"
                                name="confirm"
                                value={gateway}
                                placeholder="nhập thông tin thiết bị"
                                required
                                onChange={(e) => setGateway(e.target.value)}
                                onBlur={handleGatewayChange}
                            />
                            {gatewayError ? <p className={cx('error-message')}>{gatewayError}</p> : ''}

                            <Button className={cx('btn')} onClick={handleSignup} primary>
                                Submit
                            </Button>
                            <Button className={cx('btn-openMap')} outline onClick={handleClick}>
                                Map
                            </Button>
                        </div>
                        <div className={cx('detail')}>
                            <span
                                className={cx('', {
                                    user_sellect: true,
                                })}
                            >
                                {' '}
                                already registered?{' '}
                            </span>
                            <Button small primary to="/login">
                                Login
                            </Button>
                        </div>
                        {openMap ? (
                            <div className={cx('map')}>
                                <Leaflet parentCallback={callbackFunction} onClose={handleMap} />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
