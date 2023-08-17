import axios from 'axios';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logOutFailed,
    logOutStart,
    logOutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from './authSlice';

export const loginUser = async (user, dispatch, navigate, toast) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('https://firealerthub.onrender.com/auth/login', user, {
            withCredentials: true,
        });
        dispatch(loginSuccess(res.data));
        toast.success('Đăng nhập thành công');
        navigate('/');
    } catch (err) {
        toast.warn('Đăng nhập thất bại');
        dispatch(loginFailed(err.response.data.message));
    }
};

export const registerUser = async (user, dispatch, navigate, toast) => {
    dispatch(registerStart());
    try {
        await axios.post('https://firealerthub.onrender.com/auth/register', user);
        dispatch(registerSuccess());
        toast.success('Đăng ký thành công!');
        navigate('/login');
        return true;
    } catch (err) {
        toast.warn('Đăng ký thất bại!');
        dispatch(registerFailed());
        return false;
    }
};

export const logOut = async (dispatch, id, router, accessToken, axiosJWT) => {
    dispatch(logOutStart());
    try {
        await axiosJWT.post('https://firealerthub.onrender.com/auth/logout', id, {
            withCredentials: true,
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(logOutSuccess());
        router.push('/');
    } catch (err) {
        dispatch(logOutFailed());
    }
};
