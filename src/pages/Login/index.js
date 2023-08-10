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

    useEffect(() => {
        const lockOrientation = async () => {
            if ('screen' in window && 'orientation' in window.screen) {
                try {
                    const currentOrientation = window.screen.orientation.type;
                    await window.screen.orientation.lock(currentOrientation);
                } catch (error) {
                    console.error('Không thể khóa hướng màn hình:', error);
                }
            } else {
                console.warn('Screen Orientation API không được hỗ trợ trên trình duyệt này.');
            }
        };
        lockOrientation();
    }, []);
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
                        Đăng nhập
                    </h2>
                    <div className={cx('content')}>
                        <form onSubmit={handleLogin} className={cx('form')}>
                            <input
                                className={cx('input')}
                                type="text"
                                name="email"
                                value={email}
                                placeholder="Your Email"
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
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={handlePasswordChange}
                            />
                            {passwordError ? <p className={cx('error-message')}>{passwordError}</p> : ''}

                            <Button primary type="submit" value="submit" className={cx('btn')}>
                                Login
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
