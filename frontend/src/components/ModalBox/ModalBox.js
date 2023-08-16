import classNames from 'classnames/bind';
import DashboardTable from '../DashboardTable';
import styles from './ModalBox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminSelector, currentUserSelector, warningSelector } from '~/redux/selectors';
import { setOpenStatus, setWarning } from '~/redux/modalboxSlice';
import { getAllUserWarninginUserManager } from '~/api/managerRequest';
import { refreshToken as refreshTokenAction } from '~/redux/authSlice';
import { createAxios } from '~/createInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);
function ModalBox() {
    const admin = useSelector(adminSelector);
    const [open, setOpen] = useState(false);
    const [warningData, setWarningData] = useState([]);
    const warning = useSelector(warningSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        if (warning) {
            setOpen(true);
            dispatch(setOpenStatus(true));
        } else {
            setOpen(false);
            dispatch(setOpenStatus(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [warning]);
    const currentUser = useSelector(currentUserSelector);
    const accessToken = currentUser.accessToken;
    const userID = currentUser._doc._id;
    const navigate = useNavigate();
    const axiosJWT = createAxios(currentUser, dispatch, refreshTokenAction, toast, navigate);
    useEffect(() => {
        const fetchCallAPI = async () => {
            try {
                const data = await getAllUserWarninginUserManager(userID, accessToken, axiosJWT);
                setWarningData(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchCallAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleClose = () => {
        setOpen(false);
        dispatch(setOpenStatus(false));
        dispatch(setWarning(false));
    };
    return (
        <>
            {open ? (
                <>
                    <div className={cx('shadow')}></div>

                    <div className={cx('wrapper')}>
                        <button className={cx('btn')} onClick={handleClose}>
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                        <div className={cx('wrapper-das')}>
                            <DashboardTable
                                tram={admin === 'HCMUT_STATION' ? 'Đại học Bách Khoa' : 'Đại học Sư Phạm Kỹ Thuật'}
                                primary
                                data={warningData}
                            />
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}

export default ModalBox;
