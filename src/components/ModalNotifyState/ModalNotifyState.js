
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames/bind';
import styles from './ModalNotifyState.module.scss';
const cx = classNames.bind(styles)
function ModalInbox({showModalMessage, setShowModalMessage}) {
    return (
          <Modal
          show={showModalMessage}
          onHide={() => setShowModalMessage(false)}
          dialogClassName={` ${cx('modal-custom')} modal-90w`}
          keyboard = {true}
        >
          <Modal.Header closeButton>
            <Modal.Title id={cx('modal-title')}>
              Tin Nhắn:
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={cx('message')}>
            <p>
              Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
              commodi aspernatur enim, consectetur. Cumque deleniti temporibus
            </p>
          </Modal.Body>
          <Modal.Body className={cx('message')}>
            <p>
              Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
              commodi aspernatur enim, consectetur. Cumque deleniti temporibus
            </p>
          </Modal.Body>
  
        </Modal>
     );
}

export default ModalInbox;