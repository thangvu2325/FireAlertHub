import { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '~/firebase_setup/firebase';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import AuthContext from '~/AuthContext';

import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

const Login = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, seterror] = useState('');
    const signIn = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            return true;
        } catch (error) {
            return { error: error.message };
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmail('');
        setPassword('');
        navigate('/');
        const res = await signIn(email, password);

        if (res.error) seterror(res.error);
    };
    // const autoNavigate = () => {
    //     if (currentUser) {
    //         navigate('/');
    //     }
    // };
    // autoNavigate();
    return (
        <>
            <div className={cx('wrap')}>
                <div className={cx('container')}>
                    <h2 className={cx('title')}>Đăng nhập</h2>
                    <div className={cx('content')}>
                        {error ? <div>{error}</div> : null}
                        <form onSubmit={handleSubmit} className={cx('form')}>
                            <input
                                className={cx('input')}
                                type="text"
                                name="email"
                                value={email}
                                placeholder="Your Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className={cx('input')}
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Your Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
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
