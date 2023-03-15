import styles from './Setting.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Setting() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('container')}></div>
        </div>
    );
}

export default Setting;
