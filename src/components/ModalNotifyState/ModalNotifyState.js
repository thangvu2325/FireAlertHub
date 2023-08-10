import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames/bind';
import styles from './ModalNotifyState.module.scss';

const cx = classNames.bind(styles);
function ModalInbox({ inboxs, showModalMessage, setShowModalMessage }) {
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
            {inboxs?.slice(0, 5).map((inbox, index) => {
                return (
                    <Modal.Body className={cx('message')} key={index}>
                        <p>{inbox}</p>
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

export default ModalInbox;
