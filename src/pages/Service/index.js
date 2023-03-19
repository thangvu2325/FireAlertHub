import styles from './Service.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Service() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('container')}></div>
        </div>
    );
}

export default Service;
