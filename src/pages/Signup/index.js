import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '~/firebase_setup/firebase.js';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import Button from '~/components/Button';
import { database } from '~/firebase_setup/firebase';
import { ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import Leaflet from '~/components/Leaflet';
console.log(auth);
// eslint-disable-next-line
const cx = classNames.bind(styles);
function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [locate, setLocate] = useState('');
    const [inform, setInform] = useState('');
    const [error, seterror] = useState('');
    const [openMap, setOpenMap] = useState(false);
    // Firebase
    function writeUserData(locate, uid, confirm) {
        set(ref(database, `User_using/${confirm}`), {
            locate,
            uid,
        });
    }
    const callbackFunction = (childData) => {
        setLocate(childData);
    };
    const handleSignUp = async (email, phoneNumber, password, locate, confirm) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;

            writeUserData(locate, user.uid, confirm);
            await addDoc(collection(firestore, 'users'), {
                uid: user.uid,
                email: user.email,
            });
            return true;
        } catch (error) {
            return { error: error.message };
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            seterror('Passwords do not match');
        } else {
            setEmail('');
            setPassword('');
            setPassword2('');
            setPhone('');
            navigate('/');
            const res = await handleSignUp(email, password, phoneNumber, locate, inform);
            if (res.error) seterror(res.error);
        }
    };
    const handleMap = () => {
        setOpenMap(!openMap);
    };
    return (
        <>
            <div className={cx('wrap')}>
                <div className={cx('container')}>
                    <h2 className={cx('title')}>Sign Up</h2>
                    <div className={cx('content')}>
                        {error ? <div>{error}</div> : null}
                        <form onSubmit={handleSubmit} className={cx('form')}>
                            <input
                                className={cx('input')}
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Your Email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className={cx('input')}
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Your Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                className={cx('input')}
                                type="password"
                                name="password"
                                value={password2}
                                placeholder="Your Password again"
                                required
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                            <input
                                className={cx('input')}
                                type="text"
                                name="phone"
                                value={phoneNumber}
                                placeholder="Nhập Phone:"
                                required
                                onChange={(e) => setPhone(e.target.value)}
                            />
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
                            <input
                                className={cx('input')}
                                type="text"
                                name="confirm"
                                value={inform}
                                placeholder="nhập thông tin thiết bị"
                                required
                                onChange={(e) => setInform(e.target.value)}
                            />

                            <Button className={cx('btn')} primary type="submit">
                                Submit
                            </Button>
                            <Button className={cx('btn')} primary onClick={handleMap}>
                                Map
                            </Button>
                        </form>
                        <div className={cx('detail')}>
                            already registered?{' '}
                            <Button small outline to="/login">
                                Login
                            </Button>
                        </div>
                        <div className={cx('map')}>
                            {openMap ? <Leaflet parentCallback={callbackFunction} /> : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
