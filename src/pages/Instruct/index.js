import styles from './Instruct.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Instruct() {
    return (
        <div className={cx('wrap')}>
            <div className={cx('container')}></div>
        </div>
    );
}

export default Instruct;
