import Header from '~/layout/components/Header';
import Sidebar from '../components/Sidebar';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import ModalBox from '~/components/ModalBox';
import { useEffect } from 'react';
import { getAllUserWarninginUserManager } from '~/api/managerRequest';
import { useDispatch, useSelector } from 'react-redux';
import { adminSelector, currentUserSelector } from '~/redux/selectors';
import { createAxios } from '~/createInstance';
import { refreshToken as refreshTokenAction } from '~/redux/authSlice';
import { setWarning } from '~/redux/modalboxSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { StateContext } from '~/App';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [checked, setChecked] = useState(false);
    const [callAPI, setCallAPI] = useState(false);
    const { requestCallAPI, setRequestCallAPI } = useContext(StateContext);

    const callbackFunction = (childData) => {
        setChecked(childData);
    };
    const admin = useSelector(adminSelector);
    const currentUser = useSelector(currentUserSelector);
    const accessToken = currentUser.accessToken;
    const userID = currentUser._doc._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axiosJWT = createAxios(currentUser, dispatch, refreshTokenAction, toast, navigate);
    const fetchCallAPI = async () => {
        try {
            const data = await getAllUserWarninginUserManager(userID, accessToken, axiosJWT);
            if (data?.length) {
                dispatch(setWarning(true));
            } else {
                dispatch(setWarning(false));
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (callAPI) {
            if (admin !== 'user') {
                fetchCallAPI();
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }
        }
        setCallAPI(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callAPI]);
    useEffect(() => {
        if (admin !== 'user') {
            fetchCallAPI();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (requestCallAPI) {
            setCallAPI(true);
        }
        setRequestCallAPI(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestCallAPI]);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    return (
        <div className={cx('wrapper')}>
            <ModalBox />
            <Sidebar isTabletOrMobile={isTabletOrMobile} checked={checked} />
            <div className={cx('wrapper-content')}>
                <Header isTabletOrMobile={isTabletOrMobile} parentCallback={callbackFunction} />
                <div className={cx('container')}>
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
