import { useState } from 'react';
import { loginUser } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { errorMessageSelector } from '~/redux/selectors';
import { EmailIcon } from '~/components/Icons';
import { IconAt, IconBrandApple, IconBrandGoogle, IconEye, IconLock } from '@tabler/icons-react';
const cx = classNames.bind(styles);

const Login = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const errorMessage = useSelector(errorMessageSelector);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isRequired = (textCheck) => {
        if (textCheck === '') {
            return 'Trường này là bắt buộc!!';
        }
    };
    const handleEmailValue = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordValue = (e) => {
        setPassword(e.target.value);
    };
    const handlePasswordChange = () => {
        if (isRequired(password)) {
            setPasswordError(isRequired(password));
        } else if (password.length < 6) {
            setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
        } else {
            setPasswordError('');
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
    const handleLogin = (e) => {
        e.preventDefault();
        handleEmailChange();
        handlePasswordChange();

        if (passwordError || emailError) {
            return;
        } else {
            const newUser = {
                email: email,
                password: password,
            };
            loginUser(newUser, dispatch, navigate, toast);
            if (errorMessage) {
                setPasswordError('Tài khoản hoặc mật khẩu không đúng!');
            }
        }
    };

    return (
        <>
            <div className={cx('wrap')}>
                <div
                    className={cx('container', {
                        isDesktop: !isTabletOrMobile,
                    })}
                >
                    <div className={cx('content')}>
                        <form className={cx('form')}>
                            <div className={cx('flex-column')}>
                                <label>Email </label>
                            </div>
                            <div className={cx('inputForm')}>
                                <IconAt className={cx('svg-icon')} />
                                <input
                                    type="text"
                                    className={cx('input')}
                                    placeholder="Enter your Email"
                                    value={email}
                                    onChange={handleEmailValue}
                                />
                            </div>
                            <div className={cx('flex-column')}>
                                <label>Password </label>
                            </div>
                            <div className={cx('inputForm')}>
                                <IconLock className={cx('svg-icon')} />
                                <input
                                    type="password"
                                    className={cx('input')}
                                    placeholder="Enter your Password"
                                    value={password}
                                    onChange={handlePasswordValue}
                                />
                                <IconEye className={cx('svg-icon')} style={{ marginRight: 10 }} />
                            </div>
                            <div className={cx('flex-row')}>
                                <div>
                                    <input type="checkbox" />
                                    <label>Remember me </label>
                                </div>
                                <span className={cx('span')}>Forgot password?</span>
                            </div>
                            <button className={cx('button-submit')} onClick={handleLogin}>
                                Sign In
                            </button>
                            <p className={cx('p')}>
                                Don't have an account? <span className={cx('span')}>Sign Up</span>
                            </p>
                            <p className={cx('p')}>Or With</p>
                            <div className={cx('flex-row')}>
                                <button className={cx('btn')}>
                                    <IconBrandGoogle className={cx('svg-icon')} />
                                    Google
                                </button>
                                <button className={cx('btn')}>
                                    <IconBrandApple className={cx('svg-icon')} />
                                    Apple
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
