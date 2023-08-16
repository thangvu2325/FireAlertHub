import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames/bind';
import styles from './ModalNotifyState.module.scss';
import { IconX } from '@tabler/icons-react';
import { handleCheckInbox, handleDeleteInbox } from '~/api/managerRequest';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector } from '~/redux/selectors';
import { useNavigate } from 'react-router-dom';
import { refreshToken as refreshTokenAction } from '~/redux/authSlice';
import { createAxios } from '~/createInstance';
import { toast } from 'react-toastify';
import { deleteInbox } from '~/redux/inboxsSlice';

const cx = classNames.bind(styles);
function ModalNotifyState({ inboxs, showModalMessage, setShowModalMessage }) {
    const dataInboxs = inboxs.filter((inbox) => inbox.check === false);
    const currentUser = useSelector(currentUserSelector);
    const accessToken = currentUser?.accessToken;
    const userID = currentUser._doc._id;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const axiosJWT = createAxios(currentUser, dispatch, refreshTokenAction, toast, navigate);
    const handleCheckMessage = async (inboxId) => {
        try {
            await handleCheckInbox(userID, inboxId, accessToken, axiosJWT);
        } catch (err) {
            console.log(err);
        }
    };
    const handleDeleteMessage = async (inboxId) => {
        try {
            await handleDeleteInbox(userID, inboxId, accessToken, axiosJWT);
            dispatch(deleteInbox(inboxId));
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Modal
            show={showModalMessage}
            onHide={() => setShowModalMessage(false)}
            dialogClassName={` ${cx('modal-custom')} modal-90w`}
            keyboard={true}
        >
            <Modal.Header closeButton>
                <Modal.Title id={cx('modal-title')}>Tin Nhắn:</Modal.Title>
            </Modal.Header>
            {dataInboxs?.slice(0, 5).map((inbox, index) => {
                return (
                    <Modal.Body className={cx('message')} key={index}>
                        <p className={cx('inbox-message')} onClick={() => handleCheckMessage(inbox._id)}>
                            {inbox.message}
                        </p>
                        <Button className={cx('inbox-btn')} onClick={() => handleDeleteMessage(inbox._id)}>
                            <IconX />
                        </Button>
                    </Modal.Body>
                );
            })}
            <Modal.Footer>
                <Button className={cx('btn')} variant="primary">
                    Xem thêm...
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalNotifyState;
