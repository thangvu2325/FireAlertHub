import styles from './Security.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Security() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('container')}></div>
        </div>
    );
}

export default Security;
